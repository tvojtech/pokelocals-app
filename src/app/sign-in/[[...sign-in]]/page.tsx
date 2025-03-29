import { SignIn } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { SearchParams } from 'next/dist/server/request/search-params';
import { redirect } from 'next/navigation';

export default async function SignInPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const user = await currentUser();
  const searchParams = await props.searchParams;
  const returnUrl =
    (Array.isArray(searchParams.return)
      ? searchParams.return[0]
      : searchParams.return) ?? '/';

  if (user) {
    redirect(returnUrl);
  }
  return (
    <div className="max-w-lg mx-auto">
      <SignIn forceRedirectUrl={returnUrl} signUpUrl="/sign-up" />
    </div>
  );
}
