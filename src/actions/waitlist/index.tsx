'use server';

import { auth, currentUser } from '@clerk/nextjs/server';

import { env } from '@/env/env';

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
  const message = formData.get('message');
  const avg_tournament_size = formData.get('avg_tournament_size');

  const webhookUrl = env.WAITLIST_DISCORD_WEBHOOK_URL;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'POKÉ LOCALS',
      embeds: [
        {
          title: 'Waitlist signup',
          fields: [
            ...(name ? [{ name: 'Name', value: name }] : []),
            { name: 'User ID', value: userId },
            { name: 'Email', value: user.primaryEmailAddress?.emailAddress },
            ...(website ? [{ name: 'Website', value: website }] : []),
            ...(location ? [{ name: 'Location', value: location }] : []),
            ...(avg_tournament_size ? [{ name: 'Avg Tournament Size', value: avg_tournament_size }] : []),
            ...(message ? [{ name: 'Message', value: message }] : []),
          ],
        },
      ],
    }),
  });

  if (response.ok) {
    await fetch('https://api.clerk.com/v1/users/' + userId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.CLERK_SECRET_KEY}`,
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
