'use server';

import { auth } from '@clerk/nextjs/server';
import { v7 as uuid } from 'uuid';

import { catchError } from '@/app/utils';
import { db } from '@/lib/db';
import { userProfile } from '@/lib/db/schema';

export async function upsertPlayerProfile(data: {
  pokemonId?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const [error] = await catchError(
    db
      .insert(userProfile)
      .values({
        id: uuid(),
        clerkId: userId,
        pokemonId: data.pokemonId,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: userProfile.clerkId,
        set: {
          pokemonId: data.pokemonId,
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate,
        },
      })
  );

  if (error) {
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }

  return { success: true };
}
