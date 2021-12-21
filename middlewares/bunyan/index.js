'use strict';
module.exports = strapi => ({
  beforeInitialize() {
    strapi.config.middleware.load.after.unshift('bunyan');
  },
  initialize() {
    const { bunyan } = strapi.plugins.bunyan.services;
    bunyan.init();

    strapi.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        bunyan.sendError({
          environment: strapi.config.environment,
          strapi_version: strapi.config.info.strapi,
          method: ctx.method,
          url: ctx.request.url,
          headers: ctx.request.headers,
          body: ctx.request.body,
          error: { message: error.message, stack: `'${error.stack}'` },
          response: ctx.response
        });
        throw error;
      }
    });
  },
});
