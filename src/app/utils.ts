export function guessFullName<
  T extends { firstname?: string | null; lastname?: string | null },
>(params?: T) {
  return (params?.firstname ?? '') + ' ' + (params?.lastname ?? '');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exhaustiveMatchingGuard = (_: never): never => {
  throw new Error('Should not have reached here.');
};

export const catchError = async <T>(
  promise: Promise<T>
): Promise<[undefined, T] | [unknown]> => {
  try {
    const result = await promise;
    return [undefined, result];
  } catch (error) {
    return [error];
  }
};
