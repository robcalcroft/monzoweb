require('dotenv').load();

const path = require('path');
const webpack = require('webpack');

const inDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  entry: [
    path.resolve(__dirname, 'src/index.js'),
    'whatwg-fetch'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'src'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        loaders: [
          'file-loader',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      MONZO_CLIENT_ID: JSON.stringify(process.env.MONZO_CLIENT_ID),
      MONZO_REDIRECT_URI: JSON.stringify(process.env.MONZO_REDIRECT_URI),
      GOOGLE_MAPS_API_KEY: JSON.stringify(process.env.GOOGLE_MAPS_API_KEY),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

if (inDevelopment) {
  config.devtool = 'cheap-module-source-map';
  config.stats = { colors: true };
  config.entry = ['react-hot-loader/patch', 'webpack-hot-middleware/client'].concat(config.entry);
  config.output.publicPath = '/static/'
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      comments: false,
      compress: true,
      preamble: '(c) 2016 Rob Calcroft'
    })
  ])
}

module.exports = config;
