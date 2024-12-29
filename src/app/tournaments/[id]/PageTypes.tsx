import Link from "next/link";

import { QRCodeOverlay } from "@/app/components/QRCodeOverlay";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export enum PageTypesEnum {
  "my-pairings" = "my-pairings",
  "pairings" = "pairings",
  "standings" = "standings",
}

const pageTypeToTextMappping: Record<PageTypesEnum, string> = {
  [PageTypesEnum["my-pairings"]]: "My Pairings",
  [PageTypesEnum["pairings"]]: "Pairings",
  [PageTypesEnum["standings"]]: "Standings",
};

export const PageTypes: React.FC<{
  id: string;
  selectedPage: "my-pairings" | "pairings" | "standings";
}> = ({ id, selectedPage }) => {
  const links = Object.keys(PageTypesEnum)
    .filter((type) => type !== PageTypesEnum.standings)
    .map((key) => (
      <Link
        key={key}
        href={`/tournaments/${id}/${key}`}
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-xl",
          selectedPage === key ? "font-bold" : "font-light"
        )}
      >
        {pageTypeToTextMappping[key as PageTypesEnum]}
      </Link>
    ));

  return (
    <div className="flex justify-between">
      <div>{links}</div>
      <QRCodeOverlay />
    </div>
  );
};
