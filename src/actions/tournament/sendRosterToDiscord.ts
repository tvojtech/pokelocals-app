'use server';

import { auth } from '@clerk/nextjs/server';

export async function sendRosterToDiscord(
  webhookUrls: string[],
  data: { username: string; title: string; description: string }
) {
  const { userId, orgId } = await auth();

  if (!userId && !orgId) {
    throw new Error('Unauthorized');
  }

  const results = await Promise.allSettled(
    webhookUrls.map(webhookUrl => {
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username ?? 'POKÉ LOCALS',
          embeds: [
            {
              title: data.title,
              description: data.description,
            },
          ],
        }),
      });
    })
  );

  console.log(results);
}
