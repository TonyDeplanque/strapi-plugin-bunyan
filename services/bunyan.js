'use strict';

const defaultSettings = require('../config/settings.json');
const bunyan = require("bunyan");

const createBunyanService = () => {
  let settings = {};
  let instance = null;

  return {
    /**
     * Initialize Bunyan service
     */
    init() {
      // Make sure there isn't a Bunyan instance already running
      if (instance != null) {
        return this;
      }

      // Retrieve user settings and merge them with the default ones
      settings = {
        ...defaultSettings,
        ...strapi.plugins.bunyan.config,
      };

      try {
        instance = bunyan.createLogger({name: settings.appName,  streams: [
            {
              level: 'error',
              path: settings.path
            }
          ]});
      } catch (error) {
        strapi.log.warn('Error during init bunyan module.');
      }

      return this;
    },

    /**
     * Expose Bunyan instance through a getter
     */
    getInstance() {
      return instance;
    },

    /**
     * Higher level method to send exception events to error file locate in the settings path
     */
    sendError(error) {
      instance.error(error);
    },
  };
};

module.exports = createBunyanService();
