DROP INDEX "organization_idx";--> statement-breakpoint
CREATE INDEX "tournaments_organization_idx" ON "tournaments" USING btree ("organization_id");