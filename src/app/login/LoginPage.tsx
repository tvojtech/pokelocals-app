import { SearchParams } from 'next/dist/server/request/search-params';

import { LoginForm } from '@/app/login/LoginForm';

export type LoginPageProps = {
  searchParams: Promise<SearchParams>;
};

export async function LoginPage(props: LoginPageProps) {
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
