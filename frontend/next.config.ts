import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Límite de 5 MB para subida de imágenes en campañas (Route Handlers / proxy)
    proxyClientMaxBodySize: "5mb",
    // Límite para Server Actions por si se usan en el futuro
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
