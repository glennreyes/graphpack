const cosmiconfig = require('cosmiconfig');
const webpack = require('webpack');
const defaultConfig = require('./webpack.config');

const explorer = cosmiconfig('graphpack').search();

const loadServerConfig = async () => {
  const result = await explorer;
  const userConfig = result
    ? typeof result.config === 'function'
      ? result.config(defaultConfig.mode)
      : result.config
    : {};

  return { port: Number(process.env.PORT), ...userConfig.server };
};

const loadWebpackConfig = async () => {
  const result = await explorer;
  const userConfig = result
    ? typeof result.config === 'function'
      ? result.config(defaultConfig.mode)
      : result.config
    : {};

  if (typeof userConfig.webpack === 'function') {
    return userConfig.webpack({ config: defaultConfig, webpack });
  }

  return { ...defaultConfig, ...userConfig.webpack };
};

exports.loadServerConfig = loadServerConfig;
exports.loadWebpackConfig = loadWebpackConfig;
