/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("User")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique())
    .addColumn("emailVerified", "datetime")
    .addColumn("image", "text")
    .addColumn("password", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("Account")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("userId", "text", (col) =>
      col.notNull().references("User.id").onDelete("cascade")
    )
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("provider", "text", (col) => col.notNull())
    .addColumn("providerAccountId", "text", (col) => col.notNull())
    .addColumn("refresh_token", "text")
    .addColumn("access_token", "text")
    .addColumn("expires_at", "integer")
    .addColumn("token_type", "text")
    .addColumn("scope", "text")
    .addColumn("id_token", "text")
    .addColumn("session_state", "text")
    .execute();

  await db.schema
    .createTable("Session")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("userId", "text", (col) =>
      col.notNull().references("User.id").onDelete("cascade")
    )
    .addColumn("sessionToken", "text", (col) => col.notNull().unique())
    .addColumn("expires", "datetime", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("VerificationToken")
    .addColumn("identifier", "text", (col) => col.notNull())
    .addColumn("token", "text", (col) => col.notNull().unique())
    .addColumn("expires", "datetime", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("Account_userId_index")
    .on("Account")
    .column("userId")
    .execute();

  await db.schema
    .createIndex("Session_userId_index")
    .on("Session")
    .column("userId")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("Account").execute();
  await db.schema.dropTable("Session").execute();
  await db.schema.dropTable("User").execute();
  await db.schema.dropTable("VerificationToken").execute();
}
