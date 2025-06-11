export function DecklistPreview({ decklist }: { decklist?: string }) {
  const lines =
    decklist
      ?.split('\n')
      .filter(line => line.trim() !== '')
      .filter(line => !line.startsWith('Pokémon:') && !line.startsWith('Trainer:') && !line.startsWith('Energy:')) ??
    [];
  return (
    <div className="@container">
      <div className="grid h-full grid-cols-3 gap-2 @md:grid-cols-4 @xl:grid-cols-5">
        {lines.map(line => {
          const lineParts = line.split(' ');
          const count = parseInt(lineParts[0], 10);
          const set = lineParts[lineParts.length - 2].replace('PR-SV', 'SVP');
          const setNumber = lineParts[lineParts.length - 1];

          return (
            <div key={line} className="flex items-center justify-center">
              <div className="relative h-full">
                <img
                  src={`https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/${set}/${set}_${setNumber.padStart(3, '0')}_R_EN_XS.png`}
                  alt={line}
                />
                <div className="absolute bottom-0 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-4 transform items-center justify-center rounded-xl border border-white bg-red-600 text-white">
                  {count}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
