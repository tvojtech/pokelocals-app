'use server';

import { db, schema } from '@/db';

export async function submitFeedback(
  data: typeof schema.feedback.$inferInsert
) {
  // fixme: require authentication
  await db.insert(schema.feedback).values(data).execute();
}
