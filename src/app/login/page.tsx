import { SearchParams } from 'next/dist/server/request/search-params';
import { redirect } from 'next/navigation';

import { auth } from '../auth';
import { LoginForm } from './LoginForm';

export const revalidate = 86_400;

export default async function Login(props: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  const searchParams = await props.searchParams;

  const returnUrl = Array.isArray(searchParams.return)
    ? searchParams.return[0]
    : searchParams.return;

  if (session) {
    redirect(returnUrl ?? '/');
  }
  return (
    <div className="max-w-lg mx-auto">
      <LoginForm returnUrl={returnUrl} />
    </div>
  );
}
