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
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    }
  },
  output: {
    path: path.join(__dirname, './lib'), 
    filename: 'index.js',
    library: 'BlaglIcon',
    libraryTarget: 'umd',
    publicPath: '/lib/',
  },
  resolve: {
    extensions: ['.ts', '.tsx']
  }
}

module.exports = config;
