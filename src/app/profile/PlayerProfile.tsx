import { Alert } from '@/components/Alert';
import { PokemonIdForm } from '@/components/PokemonIdForm';

export function PlayerProfile() {
  return (
    <>
      <Alert
        type="info"
        message={
          <p>
            Pokemon ID is stored in your browser, it will not be available when
            you switch devices.
          </p>
        }
      />
      <div className="w-full">
        <PokemonIdForm />
      </div>
    </>
  );
}
