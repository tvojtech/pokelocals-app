export function guessFullName<
  T extends { firstname?: string | null; lastname?: string | null },
>(params?: T) {
  return (params?.firstname ?? '') + ' ' + (params?.lastname ?? '');
}

export function exhaustiveMatchingGuard(_: never, message: string): never {
  throw new Error('Should not have reached here. ' + message);
}

export async function catchError<T>(
  promise: Promise<T>
): Promise<[undefined, T] | [unknown]> {
  try {
    const result = await promise;
    return [undefined, result];
  } catch (error) {
    return [error];
  }
}
