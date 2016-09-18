/* eslint-disable */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + '/public/',
    publicPath: '/public/',
    filename: "bundle.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      '_': 'underscore',
      Backbone: 'exports?Backbone.default!' + __dirname + '/src/backboneConfig',
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.IgnorePlugin(/^jquery$/),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ru)$/)
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      { test: /backbone\.js$/, loader: 'imports?define=>false' },
    ],
    resolve: {
      // root: path.resolve(__dirname),
      // alias: {
      //   backboneConf: 'src/backboneConfig',
      // }
    }
  }
}
