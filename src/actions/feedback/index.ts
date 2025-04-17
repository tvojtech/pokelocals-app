'use server';

import { auth } from '@clerk/nextjs/server';

import { env } from '@/env/env';

export async function submitFeedback(data: { description: string; email?: string }) {
  const { userId } = await auth();
  const webhookUrl = env.FEEDBACK_DISCORD_WEBHOOK_URL;

  await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'POKÉ LOCALS',
      embeds: [
        {
          title: 'Feedback',
          description: data.description,
          fields: [
            ...(data.email
              ? [
                  {
                    name: 'Email',
                    value: data.email,
                  },
                ]
              : []),
            ...(userId
              ? [
                  {
                    name: 'User',
                    value: userId,
                  },
                ]
              : []),
          ],
        },
      ],
    }),
  });
}
