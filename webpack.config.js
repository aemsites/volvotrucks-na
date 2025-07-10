/* eslint-disable no-undef */
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin'); // TODO: Re-implement this back again and test
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// List of files to ignore
const ignoreFiles = [
  'blocks/dealer-locator/vendor/moment.js',
  'blocks/dealer-locator/vendor/moment-timezone.min.js',
  'blocks/dealer-locator/vendor/moment-timezone.js',
];

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

  plugins: [
    new HtmlWebpackPlugin({
      template: './head.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      exclude: ['vendor.js'],
    }),
  ],

  optimization: {
    usedExports: true,
    splitChunks: {
      // TODO: Remove after refining the chunks configuration
      /* 
      cacheGroups: {
        vcdk: {
          test: /[\\/]node_modules[\\/]@volvo[\\/]vcdk[\\/]/, // Group @volvo/vcdk code into one file
          name: 'vcdk', // Create a shared vcdk.js file
          chunks: 'all',
          priority: 10, // Higher priority to ensure this group gets picked first
        },
        default: {
          // test: /\.(js)$/,
          name: 'main', // Name of the chunk for everything else
          chunks: 'all', // Apply to all chunks
          minSize: 0, // Allow splitting for files of all sizes
          minChunks: 1, // Minimum number of chunks that must share a module before splitting
          priority: 0, // Lower priority for the default chunk
        },
        styles: false,
      }, */
      cacheGroups: {
        vcdk: {
          test: /[\\/]node_modules[\\/]@volvo[\\/]vcdk[\\/]/, // Group @volvo/vcdk code into one file
          name: 'vcdk', // Create a shared vcdk.js file
          chunks: 'all',
          maxSize: 100,
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
  },

  // Ignore files during watch mode
  watchOptions: {
    ignored: ignoreFiles.map((file) => path.resolve(__dirname, file)),
  },
};
