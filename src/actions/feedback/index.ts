'use server';

import { createFeedback, CreateFeedbackArgs } from '@/actions/feedback/createFeedback.query';
import { edgeDbClient } from '@/app/db';

export async function submitFeedback(data: CreateFeedbackArgs) {
  // fixme: require authentication
  await createFeedback(edgeDbClient, data);
}
