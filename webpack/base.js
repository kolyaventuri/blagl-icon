'use strict'
const path = require('path');

const config = {
  module: {
    rules: [
      { test: /\.tsx?$/, loaders: ['ts-loader'], exclude: [/node_modules/] }
    ]
  },
  entry: './src/index.tsx',
  externals: {
    react: 'commonjs react'
  },
  output: {
    path: path.join(__dirname, '../lib'), 
    filename: 'index.js',
    library: 'BlaglIcon',
    libraryTarget: 'commonjs2',
    publicPath: '/lib/',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.tsx']
  }
}

module.exports = config;
