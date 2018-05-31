const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const config = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    monzoweb: [
      'abortcontroller-polyfill',
      'whatwg-fetch',
      'babel-polyfill',
      path.resolve('src', 'index.jsx'),
    ],
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader'],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.ejs'),
    }),
    new webpack.EnvironmentPlugin([
      'MONZO_CLIENT_ID',
      'MONZO_REDIRECT_URI',
    ]),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api/token': 'http://127.0.0.1:8081',
    },
  },
};

if (isDevelopment) config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
