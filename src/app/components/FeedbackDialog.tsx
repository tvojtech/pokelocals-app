'use client';

import { useToggle } from '@uidotdev/usehooks';
import { Loader2, MessageCircle, X } from 'lucide-react';
import { useActionState, useEffect, useRef } from 'react';

import { submitFeedback } from '@/app/actions/feedback';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export const FeedbackDialog: React.FC<{
  button?: React.ReactNode;
  afterSuccessfulSubmit?: () => void;
}> = ({ button, afterSuccessfulSubmit }) => {
  const [isOpen, toggle] = useToggle(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [, formAction, isPending] = useActionState(async () => {
    if (!textareaRef.current) {
      return;
    }
    const result = await submitFeedback({
      description: textareaRef.current?.value,
    });

    toggle(false);
    afterSuccessfulSubmit?.();

    return result;
  }, undefined);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) {
        textareaRef.current?.focus();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={open => toggle(open)}>
      <DialogTrigger asChild>
        {button ? (
          button
        ) : (
          <Button variant="ghost" className="justify-start w-full">
            <MessageCircle />
            Feedback
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader className="space-y-6">
          <DialogTitle className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <MessageCircle />
              Submit feedback
            </div>
            <DialogClose>
              <X />
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            Please let us know what you think about our service. Your feedback
            is highly appreciated and will help us improve.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <Textarea ref={textareaRef} required rows={4} />
          <div className="w-full flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Submitting...
                </div>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
