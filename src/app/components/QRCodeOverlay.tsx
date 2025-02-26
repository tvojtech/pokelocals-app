'use client';

import { useToggle } from '@uidotdev/usehooks';
import { QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import { useWindowLocation } from '@/app/hooks';

export function QRCodeOverlay() {
  const [isOpen, toggle] = useToggle(false);
  const location = useWindowLocation();

  if (!location?.href) {
    return <QrCode />;
  }

  const buttonContent = (
    <div role="button" onClick={() => toggle()}>
      <QrCode />
    </div>
  );

  if (!isOpen) {
    return buttonContent;
  }

  return (
    <>
      <div className="relative">
        {buttonContent}
        <div
          className="fixed inset-0 bg-slate-50 bg-opacity-90 z-40 flex justify-center items-center"
          onClick={() => toggle()}>
          <QRCodeSVG value={location.href} className="w-60 h-60 m-10" />
        </div>
      </div>
    </>
  );
}
