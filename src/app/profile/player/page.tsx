import { Alert } from '@/components/Alert';
import { PokemonIdForm } from '@/components/PokemonIdForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlayerProfile() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Player Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert
          type="info"
          message={<p>Pokemon ID is stored in your browser, it will not be available when you switch devices.</p>}
        />
        <div className="w-full">
          <PokemonIdForm />
        </div>
      </CardContent>
    </Card>
  );
}
