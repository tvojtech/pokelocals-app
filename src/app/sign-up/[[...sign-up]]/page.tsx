import { SearchParams } from 'next/dist/server/request/search-params';
import { redirect } from 'next/navigation';

import { SignUp } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export default async function Signup(props: {
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
      <SignUp signInUrl="/sign-in" forceRedirectUrl={returnUrl ?? '/'} />
    </div>
  );
}
