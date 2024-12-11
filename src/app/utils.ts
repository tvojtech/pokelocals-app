export function guessFullName<
  T extends { firstname?: string | null; lastname?: string | null }
>(params?: T) {
  return (params?.firstname ?? "") + " " + (params?.lastname ?? "");
}
