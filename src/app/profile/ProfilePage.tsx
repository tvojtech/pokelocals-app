import { Alert } from "@/app/components/Alert";
import { PokemonIdForm } from "@/app/components/PokemonIdForm";

export async function ProfilePage() {
  return (
    <div className="max-w-lg mx-auto mt-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">Profile</h1>
      <Alert
        type="info"
        message={
          <p>
            Settings on this page are stored in your browser, it will not be
            available if you switch devices.
          </p>
        }
      />
      <div className="w-full">
        <PokemonIdForm />
      </div>
    </div>
  );
}
