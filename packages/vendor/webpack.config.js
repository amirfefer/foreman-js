const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { modules } = require('@theforeman/vendor-core');

const { version } = require('./package.json');
const createVendorEntry = require('./lib/createVendorEntry');
const WebpackExportForemanVendorPlugin = require('./lib/WebpackExportForemanVendorPlugin');

const filename = `[name].bundle-v${version}-[hash]`;

const config = {
  mode: 'production',

  entry: {
    'foreman-vendor': createVendorEntry(),
  },

  devtool: 'source-maps',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${filename}.js`,
  },

  optimization: {
    sideEffects: false,
    usedExports: false,
    namedModules: true,
    namedChunks: true,
    chunkIds: 'named',
  },

  resolve: {
    modules: [
      path.resolve(__dirname, './node_modules/'),
      path.resolve(
        __dirname,
        './node_modules/@theforeman/vendor-core/node_modules/'
      ),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /(\.png|\.gif)$/,
        use: 'url-loader',
      },
    ],
  },

  plugins: [
    new StatsWriterPlugin({
      filename: 'manifest.json',
      fields: null,
      transform(data, opts) {
        return JSON.stringify(data.assetsByChunkName);
      },
    }),
    new MiniCssExtractPlugin({
      filename: `${filename}.css`,
    }),
    new WebpackExportForemanVendorPlugin({ modules }),
    new CompressionWebpackPlugin(),
  ],
};

module.exports = config;
