import { User } from 'next-auth';

export type AppPermission =
  | 'tournaments:list'
  | 'tournaments:view'
  | 'tournaments:create'
  | 'tournaments:edit'
  | 'tournaments:delete';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function hasPermission(user: User, permission: AppPermission) {
  return true;
}
