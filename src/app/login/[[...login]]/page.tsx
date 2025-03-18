import { SearchParams } from 'next/dist/server/request/search-params';
import { redirect } from 'next/navigation';

import { LoginForm } from './LoginForm';
import { auth } from '@clerk/nextjs/server';

export const revalidate = 86_400;

export default async function Login(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { sessionId } = await auth();
  if (sessionId) {
    redirect('/');
  }
  const searchParams = await props.searchParams;
  return (
    <div className="max-w-lg mx-auto">
      <LoginForm
        returnUrl={
          Array.isArray(searchParams.return)
            ? searchParams.return[0]
            : searchParams.return
        }
      />
    </div>
  );
}
