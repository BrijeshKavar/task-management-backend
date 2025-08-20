/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable key-spacing */
/* eslint-disable indent */
const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const NodeHmrPlugin = require('node-hmr-plugin');
const buildConfig = require('./build.config');

const modulenameRegex = new RegExp('(@neiv|webpack/hot/poll)');

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader' // Use Babel for transpilation
        }
      }
    ],
    unsafeCache: false
  },
  resolve: {
    symlinks: true,
    cacheWithContext: false,
    unsafeCache: false,
    extensions: ['.js', '.ts']
  },
  // watchOptions: { ignored: /build/ },
  output: {
    pathinfo: false,
    path: path.join(__dirname, 'build'),
    publicPath: '/'
  },
  devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'cheap-module-source-map',
  mode: process.env.NODE_ENV || 'development',
  performance: { hints: false },
  plugins: (process.env.NODE_ENV !== 'production'
    ? [
        new webpack.HotModuleReplacementPlugin(),
        new NodeHmrPlugin({
          cmd: '{app}',
          restartOnExitCodes: [250]
        })
      ]
    : []
  ).concat([
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['build'] }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: true
    }),
    new webpack.DefinePlugin(buildConfig)
  ]),
  target: 'node',
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      allowlist: [modulenameRegex]
    })
  ],
  optimization: {
    concatenateModules: false,
    minimize: false
  },
  node: {
    __dirname: true,
    __filename: true
  }
};
