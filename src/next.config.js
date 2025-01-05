// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          fs: false, // No need for fs in the browser
          stream: require.resolve('stream-browserify'),
          zlib: require.resolve('browserify-zlib'),
        };
      }
      return config;
    },
  };
  