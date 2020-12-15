const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add the new plugin to the existing webpack plugins
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
  // Have to list all the environment variables used here to make it available
  // to the client side code
  publicRuntimeConfig: {
    STATES_ENDPOINT: process.env.STATES_ENDPOINT,
    RETAILERS_ENDPOINT: process.env.RETAILERS_ENDPOINT,
    PRICE_ENDPOINT: process.env.PRICE_ENDPOINT,
    UPDATE_RETAILER_ENDPOINT: process.env.UPDATE_RETAILER_ENDPOINT,
    CREATE_RETAILER_ENDPOINT: process.env.CREATE_RETAILER_ENDPOINT,
    DELETE_RETAILER_ENDPOINT: process.env.DELETE_RETAILER_ENDPOINT
  },
};