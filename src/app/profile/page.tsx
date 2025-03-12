import { ProfilePage } from '@/app/profile/ProfilePage';

export const revalidate = 86_400;

export default async function Profile() {
  return <ProfilePage />;
}
