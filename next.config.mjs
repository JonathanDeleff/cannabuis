import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  distDir: 'out', // Ensure the output directory is correctly specified
  trailingSlash: true, // Optional: ensures paths have trailing slashes, useful for static sites
  // Other Next.js configurations
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('chrome-aws-lambda');
    }
    return config;
  },
};
