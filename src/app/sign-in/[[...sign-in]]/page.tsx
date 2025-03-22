import { SearchParams } from 'next/dist/server/request/search-params';
import { redirect } from 'next/navigation';

import { SignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export default async function Login(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { sessionId } = await auth();
  if (sessionId) {
    redirect('/');
  }
  const searchParams = await props.searchParams;
  const returnUrl = Array.isArray(searchParams.return)
    ? searchParams.return[0]
    : searchParams.return;
  return (
    <div className="flex justify-center">
      <SignIn
        signUpUrl="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl={returnUrl ?? '/'}
      />
    </div>
  );
}
