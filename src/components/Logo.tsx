import Image from 'next/image';

type LogoProps = {
  height?: number;
  width?: number;
};

export function Logo({ height = 32, width = 137 }: LogoProps) {
  return (
    <Image
      priority
      src="/images/logo-locals-red-beta.svg"
      alt="logo"
      height={height}
      width={width}
    />
  );
}
