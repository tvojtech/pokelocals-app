'use server';

import {
  createNotificationToken,
  CreateNotificationTokenArgs,
} from '@/app/actions/notifications/createNotificationToken.query';
import { deleteNotificationToken } from '@/app/actions/notifications/deleteNotificationToken.query';
import { getNotificationTokens } from '@/app/actions/notifications/getNotificationTokens.query';
import { edgeDbClient } from '@/app/db';

export async function registerNotificationToken(
  data: CreateNotificationTokenArgs
) {
  console.log('registerNotificationToken', data);
  // fixme: require authentication???
  await createNotificationToken(edgeDbClient, data);
}

export async function unregisterNotificationToken(
  token: string,
  tournamentId: string
) {
  await deleteNotificationToken(edgeDbClient, { token, tournamentId });
}

export async function listNotificationTokens(tournamentId: string) {
  return getNotificationTokens(edgeDbClient, { tournamentId });
}
