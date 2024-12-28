import { User } from "next-auth";

export type AppPermission =
  | "tournaments:list"
  | "tournaments:view"
  | "tournaments:create"
  | "tournaments:edit"
  | "tournaments:delete";

export const hasPermission = (user: User, permission: AppPermission) => {
  return true;
};
