CREATE TABLE "time_extensions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_id" uuid NOT NULL,
	"player_pokemon_id" text NOT NULL,
	"round_number" integer NOT NULL,
	"table_number" integer NOT NULL,
	"extension_minutes" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "time_extensions" ADD CONSTRAINT "time_extensions_player_id_user_profile_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."user_profile"("id") ON DELETE no action ON UPDATE no action;