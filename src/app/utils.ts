export function guessFullName<
  T extends { firstname?: string | null; lastname?: string | null },
>(params?: T) {
  return (params?.firstname ?? '') + ' ' + (params?.lastname ?? '');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exhaustiveMatchingGuard = (_: never): never => {
  throw new Error('Should not have reached here.');
};
