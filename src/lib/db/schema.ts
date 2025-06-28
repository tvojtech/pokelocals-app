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

    decklistsAllowed: boolean('decklists_allowed').notNull().default(false),

    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'string' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP + INTERVAL '14 days'`),
  },
  table => [
    index('tournaments_organization_idx').on(table.organizationId),
    index('tournaments_expires_at_organization_idx').on(table.expiresAt, table.organizationId),
  ]
);

export const tournamentPlayerDecklists = pgTable('tournament_player_decklist', {
  id: uuid('id').primaryKey(),
  playerId: uuid('player_id')
    .references(() => userProfile.id)
    .notNull(),
  playerPokemonId: text('player_pokemon_id').notNull(),
  tournamentId: uuid('tournament_id')
    .notNull()
    .references(() => tournaments.id),
  decklist: text('decklist').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const userProfile = pgTable('user_profile', {
  id: uuid('id').primaryKey(),
  clerkId: text('clerk_id').notNull().unique(),
  pokemonId: text('pokemon_id').unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  birthDate: timestamp('birth_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
