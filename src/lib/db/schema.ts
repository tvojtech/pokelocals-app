import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tournaments = pgTable('tournaments', {
  id: uuid('id').primaryKey(),
  name: text('name').default(''),
  organizationId: text('organization_id').notNull(),
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedBy: text('updated_by').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),

  playerCount: integer('player_count').notNull().default(0),
});
