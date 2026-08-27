import BuilderDevTools from "@builder.io/dev-tools/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = BuilderDevTools()(
  BuilderDevTools()({
    turbopack: {},
    /* config options here */
  }),
);

export default nextConfig;
