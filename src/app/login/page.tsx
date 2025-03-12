import { LoginPage, LoginPageProps } from '@/app/login/LoginPage';

export const revalidate = 86_400;

export default function Login(props: LoginPageProps) {
  return <LoginPage {...props} />;
}
