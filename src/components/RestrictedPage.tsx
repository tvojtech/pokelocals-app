import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function RestrictedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session.sessionId) {
    redirect('/sign-in');
  }

  return children;
}
