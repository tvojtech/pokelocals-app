import { PokemonIdForm } from "@/app/components/PokemonIdForm";

export default async function Profile() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center">Profile</h1>
      <div className="max-w-lg mx-auto mt-8 space-y-10">
        <PokemonIdForm />
      </div>
    </>
  );
}
