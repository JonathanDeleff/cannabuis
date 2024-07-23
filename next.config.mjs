import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const webpack = require('webpack');

export default {
  webpack(config, { isServer }) {
    if (isServer) {
      // Externalize `chrome-aws-lambda` on the server-side
      config.externals.push('chrome-aws-lambda');
    }

    // Add babel-loader for `chrome-aws-lambda` files
    config.module.rules.push({
      test: /node_modules\/chrome-aws-lambda\/.*\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    });

    return config;
  },
  // Optional: Additional configuration options
  experimental: {
    scrollRestoration: true,
    concurrentFeatures: true,
  },
};
