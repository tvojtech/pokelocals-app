import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from "kysely";

import { Database } from "@/app/db/schema";

const dialect = new LibsqlDialect({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = new Kysely<Database>({
  dialect,
});
