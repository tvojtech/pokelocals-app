'use server';

import { clerkClient } from '@clerk/clerk-sdk-node';
import { auth } from '@clerk/nextjs/server';

import { catchError } from '@/app/utils';

export async function updatePlayerProfile(data: {
  pokemonId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await clerkClient.users.getUser(userId);

  if (!user) {
    throw new Error('User not found');
  }

  console.log(data);

  const [error] = await catchError(
    clerkClient.users.updateUser(userId, {
      firstName: data.firstName,
      lastName: data.lastName,
      publicMetadata: {
        ...user.publicMetadata,
        pokemonId: data.pokemonId,
        birthDate: data.birthDate,
      },
    })
  );

  if (error) {
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }

  return { success: true };
}
