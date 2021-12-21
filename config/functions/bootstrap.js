'use strict';

module.exports = async () => {
  const { bunyan } = strapi.plugins.bunyan.services;
  bunyan.init();
};
