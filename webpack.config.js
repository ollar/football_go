/* eslint-disable */
var webpack = require('webpack');
var path = require('path');

require('dotenv').config();

const firebaseConnect = {
  apiKey: process.env.FIREBASE_CONNECT_apiKey,
  authDomain: process.env.FIREBASE_CONNECT_authDomain,
  databaseURL: process.env.FIREBASE_CONNECT_databaseURL,
  projectId: process.env.FIREBASE_CONNECT_projectId,
  storageBucket: process.env.FIREBASE_CONNECT_storageBucket,
  messagingSenderId: process.env.FIREBASE_CONNECT_messagingSenderId,
}

console.log(firebaseConnect)

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
    }),
    new webpack.IgnorePlugin(/^jquery$/),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ru)$/),
    new webpack.DefinePlugin({
      firebaseConnect: JSON.stringify(firebaseConnect),
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['env']
        }
      },
      { test: /backbone\.js$/, loader: 'imports?define=>false' },
    ],
  },
  node: {
    fs: 'empty'
  }
}
