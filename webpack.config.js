const webpack       = require('webpack');
const merge         = require('webpack-merge');
const loaders       = require('./webpack-loaders');
const plugins       = require('./webpack-plugins');
const paths         = require('./webpack-paths');
const getProdConfig = require('./webpack.config.prod');
const getDevConfig  = require('./webpack.config.dev');


const common = {
  entry: ['babel-polyfill', paths.src],
  resolve: {
    alias: {
      components:  paths.components,
      containers:  paths.containers,
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      loaders.babel
    ],
  },
  plugins: [
    plugins.environment(['NODE_ENV']),
    plugins.globals(process.env.NODE_ENV),
  ],
};

function getConfig (env) {
  switch (env) {
    case 'production':
      return getProdConfig(paths, loaders, plugins);
    case 'development':
      return getDevConfig(paths, loaders, plugins);
  }
}

module.exports = merge(common, getConfig(process.env.NODE_ENV));
