import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  distDir: 'out', // Ensure Next.js builds to the 'out' directory
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('chrome-aws-lambda');
    }

    return config;
  },
};
