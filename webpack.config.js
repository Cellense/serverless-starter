const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const { isLocal } = slsw.lib.webpack;

const config = {
  entry: slsw.lib.entries,
  target: "node",
  devtool: "nosources-source-map",
  mode: isLocal ? 'development' : 'production',
  externals: [nodeExternals(), 'aws-sdk'],
  performance: {
    hints: false
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    concatenateModules: true
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@types': path.resolve(__dirname, './src/types')
    }
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    sourceMapFilename: '[file].map'
  }
};

if (isLocal) {
  config.plugins = [
    new FriendlyErrors({
      compilationSuccessInfo: { messages: ['Lambda functions are running on http://localhost:3000']}
    }),
    new ProgressBarPlugin()
  ]
}

module.exports = config;
