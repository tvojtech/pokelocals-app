'use server';

import { auth, currentUser } from '@clerk/nextjs/server';

export async function createNewOrganizerRequest(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await currentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const name = formData.get('name');
  const website = formData.get('website');
  const location = formData.get('location');
  const avg_tournament_size = formData.get('avg_tournament_size');

  const response = await fetch('https://api.getwaitlist.com/api/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      waitlist_id: '25839',
      email: user.primaryEmailAddress?.emailAddress,
      metadata: {
        name,
        website,
        location,
        avg_tournament_size,
      },
    }),
  });

  if (response.ok) {
    await fetch('https://api.clerk.com/v1/users/' + userId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        public_metadata: {
          ...(user.publicMetadata ?? {}),
          waitlist: true,
        },
      }),
    });
  }

  return { success: true };
}
