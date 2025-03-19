'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';
import { ClerkLoaded, ClerkLoading, useSignIn } from '@clerk/nextjs';
import { Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Loading } from '@/components/Loading';

export function LoginButton({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
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
}

export function LoginForm({ returnUrl }: { returnUrl?: string }) {
  const { signIn, isLoaded, setActive } = useSignIn();
  const [isWaitingForOTP, setIsWaitingForOTP] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ClerkLoading>
          {/* <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div> */}
          <Loading />
        </ClerkLoading>
        <ClerkLoaded>
          {!isWaitingForOTP ? (
            <>
              <form
                action={formData => {
                  if (!isLoaded) return;
                  signIn
                    ?.create({
                      strategy: 'email_code',
                      identifier: (formData.get('identifier') as string) ?? '',
                    })
                    .then(() => setIsWaitingForOTP(true))
                    .catch(err => console.error(err));
                }}
                className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    name="identifier"
                    placeholder="Enter your email"
                    required
                    className="flex-grow"
                  />
                </div>
                <LoginButton type="submit" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Sign in with Email
                </LoginButton>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              <div id="clerk-captcha" />

              <LoginButton
                type="button"
                className="bg-[#5865F2] focus:ring-blue-400 hover:bg-[#5865F2]"
                onClick={() => {
                  if (!isLoaded) return;
                  signIn?.authenticateWithRedirect({
                    strategy: 'oauth_discord',
                    redirectUrl: '/login/sso-callback',
                    redirectUrlComplete: returnUrl ?? '/',
                  });
                }}>
                <Image
                  src="/images/discord-mark-white.svg"
                  alt="discord"
                  width={24}
                  height={18}
                />

                <span>Sign in with Discord</span>
              </LoginButton>

              <div className="text-center text-sm mt-4">
                Don&apos;t have an account?{' '}
                <Link
                  href={`/signup${returnUrl ? `?returnUrl=${returnUrl}` : ''}`}
                  className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </>
          ) : (
            <form
              action={formData => {
                if (!isLoaded) return;
                signIn
                  ?.attemptFirstFactor({
                    strategy: 'email_code',
                    code: (formData.get('code') as string) ?? '',
                  })
                  .then(resource => {
                    if (resource.status === 'complete') {
                      setActive({ session: resource.createdSessionId });
                      redirect(returnUrl ?? '/');
                    } else {
                      console.error('email login status ', resource.status);
                    }
                  });
              }}>
              <InputOTP maxLength={6} name="code">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button type="submit" className="w-full">
                <Lock />
                Verify
              </Button>
            </form>
          )}
        </ClerkLoaded>
      </CardContent>
    </Card>
  );
}
