'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { notificationTokens } from '@/lib/db/schema';
import { rollbarServer } from '@/rollbar/server';

export type RegisterNotificationTokenParams = {
  token: string;
  tournamentId: string;
  email: string;
};

/**
 * Registers a notification token for a tournament
 */
export async function registerNotificationToken({
  token,
  tournamentId,
  email,
}: RegisterNotificationTokenParams) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: 'Unauthorized' };
    }

    const existingToken = await db.query.notificationTokens.findFirst({
      where: and(
        eq(notificationTokens.token, token),
        eq(notificationTokens.tournamentId, tournamentId)
      ),
    });

    if (existingToken) {
      return { success: true, message: 'Token already registered' };
    }

    await db.insert(notificationTokens).values({
      token,
      tournamentId,
      email,
    });

    return { success: true };
  } catch (error) {
    rollbarServer.error({
      name: 'Failed to register notification token',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return { error: 'Failed to register notification token' };
  }
}

/**
 * Lists all notification tokens for a tournament
 */
export async function listNotificationTokens(tournamentId: string) {
  try {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
      return [];
    }

    const tokens = await db
      .select({
        token: notificationTokens.token,
      })
      .from(notificationTokens)
      .where(eq(notificationTokens.tournamentId, tournamentId));

    return tokens;
  } catch (error) {
    rollbarServer.error({
      name: 'Failed to list notification tokens',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return [];
  }
}