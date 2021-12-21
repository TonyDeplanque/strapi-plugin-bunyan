# Strapi plugin Bunyan

Bunyan strapi plugin inspired by the official Strapi Bunyan plugin.

## 🧾 Features

- Initialize a Bunyan instance when your Strapi app starts
- Send errors encountered in your application's end API to a specific file in JSON format

## ⏳ Installation

To install this plugin, you need to add an NPM dependency to your Strapi application.

```sh
# Using Yarn
yarn add strapi-plugin-bunyan

# Or using NPM
npm install strapi-plugin-bunyan
```

## ⚙ Configuration

If you need change error file location or the app name you must add your configuration in `./config/plugins.js`.

| property       | type  | description                                                                                                                                                                              |
| -------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`          | string(default:'./error.log')  | Log file location                                                                     |
| `appName` | string(default:'myapp') | Your application name provided in the logs                                                                         |

**Example**

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
    bunyan: {
        appName: 'goodProject',
        path: './error2.log',
    },
  // ...
});
```

If your log file path is inside your Strapi project, you need to add this lines in the config server file `./config/server.js`.Otherwise your server will restart each time the log file is changed.

`./config/server.js`
```js
module.exports = ({ env }) => ({
  // ...
    admin: {
        watchIgnoreFiles: [
            "./error.log"
        ]
    }
  // ...
});
```

## Global Bunyan service

You can access a Bunyan service throughout your app.

```js
const bunyanService = strapi.plugins.bunyan.services.bunyan;
```

This service exposes the following methods:

### `sendError(error)`

Use it to manually send errors to the log file. 

**Example**

```js
try {
  // Your code here
} catch (error) {
  strapi.plugins.bunyan.services.bunyan.sendError(error);
  throw error;
}
```

### `getInstance()`

Use it if you need direct access to the Bunyan instance, which should already already be initialized. It's useful if `sendError` doesn't suit your needs.

**Example**

```js
const bunyanInstance = strapi.plugins.bunyan.services.bunyan.getInstance();
```

## 🎉 Use Bunyan CLI

You can use the power of Bunyan CLI http://trentm.com/node-bunyan/bunyan.1.html

**Example**

```sh
./node_modules/.bin/bunyan error.log
```

## 💔 Disabling

### Disabling only the middleware

By default, this plugin uses a middleware that logs all your unhandled API errors to log file. You can disable this feature by turning off the `bunyan` middleware in your app's config.

**Example**

`./config/middleware.js`

```js
module.exports = {
  //...
  settings: {
    bunyan: {
      enabled: false,
    },
  },
};
```

Only the middleware will be disabled. You will still have access to the Bunyan service.

## 🤝 Contributing

Feel free to fork and make a Pull Request to this plugin project. All the input is warmly welcome!

## ⭐️ Show your support

Give a star if this project helped you.