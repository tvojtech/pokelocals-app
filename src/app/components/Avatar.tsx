import Image from "next/image";
import React from "react";

import { cn } from "@/app/ui/utils";

type AvatarProps = {
  className?: string;
  src?: string;
  alt?: string;
};

export const Avatar: React.FC<React.PropsWithChildren<AvatarProps>> = ({
  children,
  className,
  src,
  alt = "Avatar",
}) => {
  return (
    <div
      className={cn(
        "rounded-full w-10 h-10 flex items-center justify-center bg-primary text-white font-bold text-xl",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          className="rounded-full"
          width={36}
          height={36}
        />
      ) : (
        children || (
          <Image
            src="/images/avatar.svg"
            alt={alt}
            className="rounded-full"
            width={36}
            height={36}
          />
        )
      )}
    </div>
  );
};
