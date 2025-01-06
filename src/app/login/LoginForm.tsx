import Image from 'next/image';

import { signIn } from '@/app/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const LoginButton: React.FC<React.ComponentProps<typeof Button>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      type="submit"
      className={cn(
        'shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full flex-wrap',
        className
      )}
      {...props}>
      {children}
    </Button>
  );
};

export function LoginForm({ returnUrl }: { returnUrl?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Choose your preferred sign-in method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* <form
          onSubmit={async () => {
            "use server";
          }}
          className="space-y-2"
        >
          <div className="flex space-x-2">
            <Input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-grow"
            />
          </div>
          <LoginButton type="submit" className="w-full" disabled>
            <Mail className="mr-2 h-4 w-4" />
            Sign in with Email
          </LoginButton>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div> */}
        <form
          action={async () => {
            'use server';
            await signIn('discord', { redirectTo: returnUrl ?? '/' });
          }}>
          <LoginButton
            type="submit"
            className="bg-[#5865F2] focus:ring-blue-400 hover:bg-[#5865F2]">
            <Image
              src="/images/discord-mark-white.svg"
              alt="discord"
              width={24}
              height={18}
            />

            <span>Sign in with Discord</span>
          </LoginButton>
        </form>
      </CardContent>
    </Card>
  );
}
