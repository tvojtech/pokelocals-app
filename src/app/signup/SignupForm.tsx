'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSignUp, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Loading } from '@/components/Loading';

export function SignupButton({
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

export function SignupForm({ returnUrl }: { returnUrl?: string }) {
  const { signUp, isLoaded, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();

  // Handle email signup
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signUp.create({ emailAddress, firstName, lastName });

      // Start the email verification process
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error('Error during sign up:', err);
    }
  };

  // Handle verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !verificationCode) return;

    setVerifying(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push(returnUrl ?? '/');
      }
    } catch (err) {
      console.error('Error verifying email:', err);
    } finally {
      setVerifying(false);
    }
  };

  // Handle Discord OAuth
  const handleDiscordSignUp = () => {
    if (!isLoaded) return;

    signUp.authenticateWithRedirect({
      strategy: 'oauth_discord',
      redirectUrl: '/login/sso-callback',
      redirectUrlComplete: returnUrl ?? '/',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Sign up
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ClerkLoading>
          {/* <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div> */}
          <Loading />
        </ClerkLoading>

        <ClerkLoaded>
          {!pendingVerification ? (
            <>
              <form onSubmit={handleEmailSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="First name (optional)"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Last name (optional)"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    value={emailAddress}
                    onChange={e => setEmailAddress(e.target.value)}
                    placeholder="Email address"
                    required
                    className="w-full"
                  />
                </div>
                <SignupButton type="submit" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Continue with Email
                </SignupButton>
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

              <SignupButton
                type="button"
                className="bg-[#5865F2] focus:ring-blue-400 hover:bg-[#5865F2]/90 text-white"
                onClick={handleDiscordSignUp}>
                <Image
                  src="/images/discord-mark-white.svg"
                  alt="discord"
                  width={24}
                  height={18}
                  className="mr-2"
                />
                Sign up with Discord
              </SignupButton>

              <div className="text-center text-sm mt-4">
                Already have an account?{' '}
                <Link
                  href={`/login${returnUrl ? `?returnUrl=${returnUrl}` : ''}`}
                  className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  We&apos;ve sent a verification code to{' '}
                  <span className="font-medium">{emailAddress}</span>
                </p>
              </div>

              <InputOTP
                maxLength={6}
                onComplete={setVerificationCode}
                disabled={verifying}
                className="justify-center gap-2">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button
                type="submit"
                className="w-full"
                disabled={verifying}
                onClick={handleVerify}>
                {verifying ? 'Verifying...' : 'Verify Email'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setPendingVerification(false)}>
                Back to sign up
              </Button>
            </div>
          )}
        </ClerkLoaded>
      </CardContent>
    </Card>
  );
}
