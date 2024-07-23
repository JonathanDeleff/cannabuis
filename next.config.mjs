import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('chrome-aws-lambda');
    }

    return config;
  },
};