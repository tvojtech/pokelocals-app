import { PageTabs } from './PageTabs';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <PageTabs />
      <div className="space-y-4">{children}</div>
    </div>
  );
}
