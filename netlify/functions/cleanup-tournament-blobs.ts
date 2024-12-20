import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";

export default async () => {
  const store = getStore("tournaments");
  const now = new Date();

  const { blobs } = await store.list();

  await Promise.all(
    blobs.map(async (blob) => {
      const metadata = await store.getMetadata(blob.key);
      if (typeof metadata?.metadata.uploadedAt === "string") {
        const uploadedAt = new Date(metadata.metadata.uploadedAt);
        const diff = now.getTime() - uploadedAt.getTime();
        const diffDays = diff / (1000 * 3600 * 24);
        if (diffDays > 2) {
          store.delete(blob.key);
        }
      } else {
        store.delete(blob.key);
      }
    })
  );
};

export const config: Config = {
  schedule: "@hourly",
};
