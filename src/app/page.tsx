import { redirect } from 'next/navigation';

export const revalidate = 86_400;

export default function Home() {
  redirect('/tournaments');
}
