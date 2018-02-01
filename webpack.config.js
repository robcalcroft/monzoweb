const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/App.jsx',
  output: {
    filename: 'bundle.[chunkhash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: process.env.NODE_ENV === 'production',
            },
          },
          'postcss-loader',
        ],
      }),
    }, {
      test: /\.(svg|woff)$/,
      loader: 'url-loader',
    }],
  },
  devtool: isProduction ? '' : 'cheap-eval-source-map',
  plugins: [
    new webpack.EnvironmentPlugin([
      'MONZO_CLIENT_ID',
      'MONZO_REDIRECT_URI',
      'GOOGLE_MAPS_API_KEY',
    ].concat(isProduction ? ['NODE_ENV'] : [])),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      ...(isProduction ? {
        minify: {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
        },
      } : {}),
    }),
    new ExtractTextPlugin('bundle.[chunkhash].css'),
  ].concat(isProduction ? [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      comments: false,
    }),
  ] : []),
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://127.0.0.1:8081',
    },
  },
};
