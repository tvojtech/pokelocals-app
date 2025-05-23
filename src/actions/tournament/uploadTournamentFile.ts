'use server';

import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import admin from 'firebase-admin';
import { type Message } from 'firebase-admin/messaging';
import { revalidateTag } from 'next/cache';

import { listNotificationTokens } from '@/actions/notifications';
import { xmlToObject } from '@/actions/tournament/xml';
import { redis } from '@/app/db';
import { getStore } from '@/blobs';
import { db } from '@/lib/db';
import { tournaments } from '@/lib/db/schema';
import { rollbarServer } from '@/rollbar/server';
import serviceAccount from '@/serviceAccount.json';

import { loadTournamentMetadata } from './loadTournamentMetadata';
import { calculatePlayerScores, calculateUnofficialStandings } from './tournamentUtils';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export async function uploadTournamentFile(formData: FormData, tournamentId: string) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return { error: 'Unauthorized' };
  }

  if (!orgId) {
    return { error: 'No organization selected' };
  }

  const file = formData.get('file') as File;

  if (!file) {
    return { error: 'No file selected' };
  }

  try {
    const tournamentMetadata = await loadTournamentMetadata(tournamentId);

    if (!tournamentMetadata) {
      return { error: 'Tournament not found' };
    }

    if (tournamentMetadata.organizationId !== orgId) {
      return { error: 'You are not allowed to manage this tournament.' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const xmlString = buffer.toString('utf-8');

    const tournament = calculateUnofficialStandings(calculatePlayerScores(xmlToObject(xmlString)));

    if (
      tournamentMetadata.uploaded &&
      ((tournamentMetadata.tomId ?? '') !== (tournament.data.id ?? '') ||
        (tournamentMetadata.startDate ?? '') !== (tournament.data.startdate ?? '') ||
        (tournamentMetadata.name ?? '') !== (tournament.data.name ?? ''))
    ) {
      return { error: 'Uploading different tournament file!' };
    }

    const key = `${tournamentId}/time/${Date.now()}`;
    const xmlStore = await getStore(`tournaments`);
    await xmlStore.set(key, xmlString);

    await db
      .update(tournaments)
      .set({
        name: tournament.data.name,
        uploaded: true,
        tomId: tournament.data.id,
        startDate: tournament.data.startdate,
        playerCount: Math.max(Object.keys(tournament.players).length, tournamentMetadata.playerCount),
      })
      .where(eq(tournaments.id, tournamentId));

    const redisKey = `tournaments/${tournamentId}`;
    await redis
      .multi()
      .set(redisKey, JSON.stringify(tournament))
      .expire(redisKey, 604800) // 1 week
      .exec();

    revalidateTag('tournaments');
    revalidateTag(`tournaments:${tournamentId}`);
    revalidateTag(`tournaments:org_${orgId}`);

    // Send push notifications
    const link = `/tournaments/${tournamentId}/pairings`;
    const payload: Message = {
      webpush: {
        fcmOptions: {
          link,
        },
      },
    };

    const tokens = (await listNotificationTokens(tournamentId)).map(({ token }) => token);

    if (tokens.length > 0) {
      try {
        await admin.messaging().sendEachForMulticast({
          tokens,
          notification: {
            title: 'Pairings are online',
            body: `${tournamentMetadata.name} tournament has been updated`,
          },
          webpush: {
            fcmOptions: {
              link,
            },
          },
          data: {
            link,
          },
        });
        console.log(`Successfully sent notifications to ${tokens.length} devices`);
      } catch (error) {
        console.error('Error sending notifications:', error);
        rollbarServer.error({
          name: 'Failed to send notifications',
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        });
      }
    }

    return { success: true };
  } catch (error) {
    rollbarServer.error({
      name: 'Failed to upload file',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return { error: 'Failed to upload file' };
  }
}
