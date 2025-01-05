import { SearchParams } from 'next/dist/server/request/search-params';
import { redirect } from 'next/navigation';

import { QRCodeOverlay } from '@/app/components/QRCodeOverlay';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export enum PageTypesEnum {
  'my-pairings' = 'my-pairings',
  'pairings' = 'pairings',
  'roster' = 'roster',
  'standings' = 'standings',
}

const pageTypeToTextMappping: Record<PageTypesEnum, string> = {
  [PageTypesEnum['my-pairings']]: 'My Pairings',
  [PageTypesEnum['pairings']]: 'Pairings',
  [PageTypesEnum['roster']]: 'Roster',
  [PageTypesEnum['standings']]: 'Standings',
};

const handleClick = ({
  searchParams,
  key,
  id,
}: {
  searchParams: SearchParams;
  key: string;
  id: string;
}) => {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else {
      params.set(key, value ?? '');
    }
  });
  params.set('w', key);
  console.log(params.toString());
  redirect(`/tournaments/${id}/pairings?${params.toString()}`);
};

export const PageTypes: React.FC<{
  id: string;
  selectedPage: PageTypesEnum;
  searchParams: SearchParams;
}> = ({ id, selectedPage, searchParams }) => {
  const links = Object.keys(PageTypesEnum)
    .filter(type => type !== PageTypesEnum.standings)
    .map(key => (
      <Button
        key={key}
        onClick={async () => {
          'use server';
          handleClick({ searchParams, key, id });
        }}
        variant="link"
        className={cn(
          'text-xl',
          selectedPage === key ? 'font-bold' : 'font-light'
        )}>
        {pageTypeToTextMappping[key as PageTypesEnum]}
      </Button>
    ));

  return (
    <div className="flex justify-between items-center">
      <div>{links}</div>
      <QRCodeOverlay />
    </div>
  );
};
