CREATE TABLE "tournament_player_decklist" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_id" uuid NOT NULL,
	"player_pokemon_id" text NOT NULL,
	"tournament_id" uuid NOT NULL,
	"decklist" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profile" (
	"id" uuid PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"pokemon_id" text,
	"first_name" text,
	"last_name" text,
	"birth_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profile_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "user_profile_pokemon_id_unique" UNIQUE("pokemon_id")
);
--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "expires_at" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '14 days';--> statement-breakpoint
ALTER TABLE "tournaments" ADD COLUMN "has_pairings" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ADD COLUMN "decklists_allowed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "tournament_player_decklist" ADD CONSTRAINT "tournament_player_decklist_player_id_user_profile_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."user_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tournament_player_decklist" ADD CONSTRAINT "tournament_player_decklist_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE no action ON UPDATE no action;