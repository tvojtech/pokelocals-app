import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
  User: UserTable;
  Account: AccountTable;
  Session: SessionTable;
  VerificationToken: VerificationTokenTable;
}

export interface UserTable {
  id: Generated<string>;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string;
}

export interface AccountTable {
  id: Generated<string>;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}

export interface SessionTable {
  id: Generated<string>;
  userId: string;
  sessionToken: string;
  expires: Date;
}

export interface VerificationTokenTable {
  identifier: string;
  token: string;
  expires: Date;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable> & { password: string };
export type UserUpdate = Updateable<UserTable>;

export type Account = Selectable<AccountTable>;
export type NewAccount = Insertable<AccountTable>;
export type AccountUpdate = Updateable<AccountTable>;

export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;

export type VerificationToken = Selectable<VerificationTokenTable>;
export type NewVerificationToken = Insertable<VerificationTokenTable>;
export type VerificationTokenUpdate = Updateable<VerificationTokenTable>;
