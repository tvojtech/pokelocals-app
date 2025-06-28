'use server';

import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { catchError } from '@/app/utils';
import { db } from '@/lib/db';
import { userProfile } from '@/lib/db/schema';

export async function getUserProfile() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  const [error, result] = await catchError(
    db.select().from(userProfile).where(eq(userProfile.clerkId, userId)).execute()
  );

  if (error) {
    throw error;
  }

  if (!result || result.length === 0) {
    return null;
  }

  if (result.length > 1) {
    throw new Error('Multiple user profiles found');
  }

  return result[0];
}
