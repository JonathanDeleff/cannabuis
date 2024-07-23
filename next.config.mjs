import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const webpack = require('webpack');

export default {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('chrome-aws-lambda');
    }

    config.module.rules.push({
      test: /node_modules\/chrome-aws-lambda\/(.*)\.js$/,
      use: 'babel-loader',
    });

    return config;
  },
};
