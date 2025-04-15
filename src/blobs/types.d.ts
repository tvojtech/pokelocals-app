export type BlobMetadata = Record<string, string>;

export type BlobStore = {
  get: (key: string) => Promise<{ content: string; metadata: BlobMetadata } | undefined>;
  getJSON: <T>(key: string) => Promise<{ content: T; metadata: BlobMetadata } | undefined>;
  set: (key: string, data: string, options?: { metadata?: BlobMetadata }) => Promise<void>;
  setJSON(key: string, data: unknown, options?: { metadata?: BlobMetadata }): Promise<void>;
  list(): Promise<string[]>;
};
