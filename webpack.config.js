/* eslint-disable */
var webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + '/public/',
    publicPath: '/public/',
    filename: "bundle.js"
  },
  watch: true,
  plugins: [
    new webpack.ProvidePlugin({
      '_':          'underscore',
      'Backbone':   'backbone',
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    // new webpack.IgnorePlugin(/^jquery$/),
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
      // { test: /backbone\.js$/, loader: 'imports?define=>false' },
    ]
  }
}
