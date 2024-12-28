import { authorizedServerPage } from "@/app/components/authorizedServerPage";
import { TournamentsForm } from "@/app/tournaments/TournamentsForm";

export const TournamentsPage: React.FC = authorizedServerPage(async () => {
  return <TournamentsForm />;
});
