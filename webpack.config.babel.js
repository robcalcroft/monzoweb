import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';

dotenv.load();

export default {
  stats: {
    colors: true
  },
  entry: [
    path.resolve(__dirname, 'src/index.js')
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
    //new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new webpack.DefinePlugin({
      MONDO_CLIENT_ID: JSON.stringify(process.env.MONDO_CLIENT_ID),
      MONDO_REDIRECT_URI: JSON.stringify(process.env.MONDO_REDIRECT_URI)
    })
  ].concat(process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      comments: false,
      compress: true,
      preamble: '(c) 2016 Rob Calcroft'
    })
  ] : [])
};
