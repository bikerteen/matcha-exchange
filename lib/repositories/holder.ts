import { createLocalStore } from "@/lib/storage/local-store";

/** The name printed on the ownership certificate. */
export const HOLDER_NAME_MAX = 28;

export const holderNameStore = createLocalStore<string>(
  "lmx:holder-name:v1",
  (raw) => (typeof raw === "string" ? raw.slice(0, HOLDER_NAME_MAX) : ""),
  "",
);
