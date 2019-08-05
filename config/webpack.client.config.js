const webpack = require("webpack");
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: {
    app: './src/entry-client.js'
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'axios-client': './axios-client.js'
    }
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "css-loader"
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {},
    minimize: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new VueSSRClientPlugin()
  ]
};
