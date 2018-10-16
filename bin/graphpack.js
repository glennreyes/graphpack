#!/usr/bin/env node
const nodemon = require('nodemon');
const path = require('path');
const { once } = require('ramda');
const webpack = require('webpack');
const { loadWebpackConfig } = require('../config');

const startDevServer = ({ compiler, config }) => {
  const serverPaths = Object.keys(compiler.options.entry).map(entry =>
    path.join(compiler.options.output.path, `${entry}.js`),
  );
  compiler.watch(
    config.watchOptions,
    once((error, stats) => {
      if (error || stats.hasErrors()) {
        throw Error(error || stats.toJson().errors);
      }

      nodemon({ script: serverPaths[0], watch: serverPaths }).on(
        'quit',
        process.exit,
      );
    }),
  );
};

const createProductionBuild = ({ compiler }) => {
  compiler.run((error, stats) => {
    if (error || stats.hasErrors()) {
      throw Error(error || stats.toJson().errors);
    }
  });
};

const startGraphPack = async () => {
  const config = await loadWebpackConfig();
  const compiler = webpack(config);

  require('yargs')
    .command(['$0', 'dev'], 'Start graphpack dev server', {}, () =>
      startDevServer({ compiler, config }),
    )
    .command('build', 'Create production build', {}, () =>
      createProductionBuild({ compiler }),
    ).argv;
};

startGraphPack();
