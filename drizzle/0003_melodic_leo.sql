ALTER TABLE "tournaments" ALTER COLUMN "name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ADD COLUMN "player_count" integer DEFAULT 0 NOT NULL;