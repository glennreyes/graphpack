#!/usr/bin/env node
const nodemon = require('nodemon');
const path = require('path');
const { once } = require('ramda');
const webpack = require('webpack');
const { generate } = require('graphql-code-generator');
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

const generateSchemaTypings = (watch = false) => {
  const srcPath = process.env.GRAPHPACK_SRC_DIR || `${process.cwd()}/src/`;
  const schemaFilesRegex = path.join(srcPath, './**/*.graphql');

  generate({
    schema: schemaFilesRegex,
    template: 'graphql-codegen-typescript-template',
    out: path.join(srcPath, 'graphql-typings.ts'),
    args: [],
    watch,
    overwrite: true,
  });
};

const startGraphPack = async () => {
  const config = await loadWebpackConfig();
  const compiler = webpack(config);

  require('yargs')
    .command(['$0', 'dev'], 'Start graphpack dev server', {}, () => {
      generateSchemaTypings(true);
      startDevServer({ compiler, config });
    })
    .command('build', 'Create production build', {}, () => {
      generateSchemaTypings(false);
      createProductionBuild({ compiler });
    }).argv;
};

startGraphPack();
