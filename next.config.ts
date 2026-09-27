import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // A stray lockfile in a parent folder otherwise confuses root detection.
    root: path.join(__dirname),
  },
};

export default nextConfig;
