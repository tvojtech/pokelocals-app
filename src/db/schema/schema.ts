import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const feedback = pgTable('feedbacks', {
  id: serial('id').primaryKey(),
  description: text().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const notificationToken = pgTable('notification_tokens', {
  id: serial('id').primaryKey(),
  token: text().notNull().unique(),
  tournamentId: text('tournament_id').notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
