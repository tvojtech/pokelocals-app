'use server';

import {
  createFeedback,
  CreateFeedbackArgs,
} from '@/app/actions/feedback/createFeedback.query';
import { edgeDbClient } from '@/app/db';

export async function submitFeedback(data: CreateFeedbackArgs) {
  // fixme: require authentication
  await createFeedback(edgeDbClient, data);
}
