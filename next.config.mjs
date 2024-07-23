/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
      // Add a rule to handle .map files
      config.module.rules.push({
        test: /\.map$/,
        use: 'ignore-loader',
      });
  
      // Ensure the config resolves TypeScript files if you're using them
      config.resolve.extensions.push('.ts', '.tsx');
  
      // Customize further Webpack settings if needed
      // Example: Adding a plugin to manage large assets
      // const webpack = require('webpack');
      // config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /some-large-asset/ }));
  
      // Example: Modify optimization settings
      // config.optimization.splitChunks.maxSize = 200000;
  
      return config;
    },
  };
  
  export default nextConfig;
  