CREATE TABLE IF NOT EXISTS "notification_tokens" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "token" text NOT NULL,
    "email" text NOT NULL,
    "tournament_id" uuid NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "notification_tokens_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "tournaments" ("id") ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS "notification_tokens_token_idx" ON "notification_tokens" ("token");
CREATE INDEX IF NOT EXISTS "notification_tokens_tournament_idx" ON "notification_tokens" ("tournament_id");