import type { NextConfig } from "next";

// Optional repo subpath when deployed at username.github.io/<REPO>/
// Set NEXT_PUBLIC_BASE_PATH="/portfolio" in the GitHub Actions env if your
// repo is NOT named `<username>.github.io`. Leave empty for a root user-site.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
