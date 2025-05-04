ALTER TABLE "tournaments" ADD COLUMN "uploaded" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ADD COLUMN "tom_id" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "tournaments" ADD COLUMN "start_date" text DEFAULT '';