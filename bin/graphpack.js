#!/usr/bin/env node
const nodemon = require('nodemon');
const path = require('path');
const { once } = require('ramda');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');

const compiler = webpack(webpackConfig);

const startDevServer = () => {
  const serverPaths = Object.keys(compiler.options.entry).map(entry =>
    path.join(compiler.options.output.path, `${entry}.js`),
  );
  compiler.watch(
    webpackConfig.watchOptions,
    once((error, stats) => {
      if (error || stats.hasErrors()) {
        throw Error(error || stats.errors);
      }

      nodemon({ script: serverPaths[0], watch: serverPaths }).on(
        'quit',
        process.exit,
      );
    }),
  );
};

const createProductionBuild = () => {
  compiler.run((error, stats) => {
    if (error || stats.hasErrors()) {
      throw Error(error || stats.errors);
    }
  });
};

require('yargs')
  .command(['$0', 'dev'], 'Run development mode', {}, startDevServer)
  .command('build', 'Create a production build', {}, createProductionBuild)
  .argv;
