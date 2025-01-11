export type BlobStore = {
  get: (key: string) => Promise<string | undefined>;
  getJSON: <T>(key: string) => Promise<T | undefined>;
  setJSON(
    key: string,
    data: unknown,
    {
      metadata,
    }?: {
      metadata?: Record<string, unknown>;
    }
  ): Promise<void>;
  // set: (key: string, value: string) => Promise<void>;
  // setJSON: (
  //   key: string,
  //   value: unknown,
  //   options?: { metadata?: Record<string, string> }
  // ) => Promise<void>;
};
