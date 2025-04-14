import { PokemonIdForm } from '@/components/PokemonIdForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlayerProfile() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Player Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="info">
          <AlertDescription>
            Pokemon ID is stored in your browser, it will not be available when you switch devices.
          </AlertDescription>
        </Alert>
        <div className="w-full">
          <PokemonIdForm />
        </div>
      </CardContent>
    </Card>
  );
}
