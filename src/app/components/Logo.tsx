import Image from "next/image";

type LogoProps = {
  height?: number;
  width?: number;
};

export const Logo: React.FC<LogoProps> = ({ height = 32, width = 137 }) => {
  return (
    <Image priority src="/logo.svg" alt="logo" height={height} width={width} />
  );
};
