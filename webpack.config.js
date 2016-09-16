const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ROOT_PATH = path.resolve(__dirname);

const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0'; // Set to localhost if need be.
const URL = `http://${HOST}:${PORT}`;

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
  entry: [
    path.resolve(ROOT_PATH,'app/src/index')
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: process.env.NODE_ENV === 'production' ? [] : ['eslint'],
        include: path.resolve(ROOT_PATH, './app')
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    },
    {
      test: /\.svg$/,
      loader: 'babel!svg-react'
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.scss$/,
      loaders: ['style','css', 'postcss', 'sass']
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader!postcss-loader"
    },
    {
      test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
      loader: "url-loader?mimetype=application/font-woff"
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
      loader: "file-loader?name=[name].[ext]"
    },
    {
      test: /\.(jpg|png)$/,
      loader: 'file?name=[path][name].[hash].[ext]'
    }
  ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: path.resolve(ROOT_PATH, 'app/src/actions'),
      utils: path.resolve(ROOT_PATH, 'app/src/utils'),
      reducers: path.resolve(ROOT_PATH, 'app/src/reducers'),
      store: path.resolve(ROOT_PATH, 'app/src/stores'),
      components: path.resolve(ROOT_PATH, 'app/src/components'),
      containers: path.resolve(ROOT_PATH, 'app/src/containers'),
      constants: path.resolve(ROOT_PATH, 'app/src/constants'),
      pages: path.resolve(ROOT_PATH, 'app/src/pages')
    },
  },
  output: {
    path: process.env.NODE_ENV === 'production' ?
      path.resolve(ROOT_PATH, 'public') : path.resolve(ROOT_PATH, 'app/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'app/build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    host: HOST,
    port: PORT
  },
  postcss: function () {
    return {
      defaults: [precss, autoprefixer],
      cleaner:  [autoprefixer({ browsers: [] })]
    };
  },
  plugins: process.env.NODE_ENV === 'production' ?
  [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]
:
  [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'React Weekly',
      template: 'index.html'
    }),
  ]
};
