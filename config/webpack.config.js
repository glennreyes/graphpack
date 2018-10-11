const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

console.log(require.resolve('babel-loader'));

module.exports = {
  entry: {
    // We take care of setting up the server under ./server.js
    index: ['graphpack'],
  },
  // When bundling with Webpack for the backend you usually don't want to bundle
  // its node_modules dependencies. This creates an externals function that
  // ignores node_modules when bundling in Webpack.
  externals: [nodeExternals({ whitelist: [/^graphpack$/] })],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.graphql/,
        use: 'graphql-tag/loader',
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: true,
              cacheDirectory: true,
              presets: [require.resolve('../babel')],
            },
          },
        ],
      },
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
      },
    ],
  },
  optimization: { noEmitOnErrors: true },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(process.cwd(), './build'),
    sourceMapFilename: '[name].map',
  },
  plugins: [new FriendlyErrorsWebpackPlugin({ clearConsole: false })],
  resolve: {
    alias: { __GRAPHPACK_SRC__: path.resolve(process.cwd(), 'src') },
    extensions: ['.wasm', '.js', '.mjs', '.json', '.graphql'],
  },
  stats: 'minimal',
  target: 'node',
};
