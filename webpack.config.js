/* eslint-disable no-undef */
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const enableSourceMaps = process.env.SOURCEMAPS === 'true';

// List of files to ignore
const ignoreFiles = [
  'blocks/dealer-locator/vendor/moment.js',
  'blocks/dealer-locator/vendor/moment-timezone.min.js',
  'blocks/dealer-locator/vendor/moment-timezone.js',
];

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Volvo NA',
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),
];

if (enableSourceMaps) {
  plugins.push(
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      exclude: ['vendor.js'],
    }),
  );
}

module.exports = {
  mode: 'production',

  entry: './scripts/entrypoint.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
    publicPath: '/dist/',
  },

  resolve: {
    modules: [path.resolve(__dirname, 'blocks'), 'node_modules'],
    preferRelative: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: (filePath) => {
          const relativeFilePath = path.relative(__dirname, filePath); // Normalize path
          return !ignoreFiles.includes(relativeFilePath); // Exclude ignored files
        },
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins, 

  optimization: {
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vcdk: {
          test: /[\\/]node_modules[\\/]@volvo[\\/]vcdk[\\/]/, // Group @volvo/vcdk code into one file
          name: 'vcdk', // Create a shared vcdk.js file
          chunks: 'all',
          minSize: 100, // Allow splitting for files of all sizes
          enforce: true, // Ensure this group is always created
          priority: 10, // Higher priority to ensure this group gets picked first
        },
        default: {
          name: 'main',
          chunks: 'all',
          minSize: 100, // Allow splitting for files of all sizes
          minChunks: 2,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: true,
          mangle: true,
          format: { comments: false },
        },
      }),
    ],
  },

  // Ignore files during watch mode
  watchOptions: {
    ignored: ignoreFiles.map((file) => path.resolve(__dirname, file)),
  },
};
