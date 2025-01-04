import { RestrictedPage } from '@/app/components/RestrictedPage';
import { TournamentsForm } from '@/app/tournaments/TournamentsForm';

export const TournamentsPage: React.FC = async () => {
  return (
    <RestrictedPage>
      <TournamentsForm />
    </RestrictedPage>
  );
};
