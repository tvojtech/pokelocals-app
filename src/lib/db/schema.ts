import { sql } from 'drizzle-orm';
import { boolean, index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tournaments = pgTable(
  'tournaments',
  {
    id: uuid('id').primaryKey(),
    name: text('name'),
    organizationId: text('organization_id').notNull(),
    createdBy: text('created_by').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedBy: text('updated_by').notNull(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),

    uploaded: boolean('uploaded').notNull().default(false),
    tomId: text('tom_id'),
    startDate: text('start_date'),

    hasPairings: boolean('has_pairings').notNull().default(false),

    playerCount: integer('player_count').notNull().default(0),

    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'string' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP + INTERVAL '9 days'`),
  },
  table => [
    index('tournaments_organization_idx').on(table.organizationId),
    index('tournaments_expires_at_organization_idx').on(table.expiresAt, table.organizationId),
  ]
);
