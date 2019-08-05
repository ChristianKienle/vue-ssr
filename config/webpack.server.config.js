const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");

module.exports =  {
	entry: './src/entry-server.js',
	target: 'node',
	devtool: 'source-map',
	resolve: {
		alias: {
			'axios-client': './axios-server.js'
		}
  },
  module: {
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
	output: {
		filename: 'server-bundle.js',
		libraryTarget: 'commonjs2'
	},
	externals: nodeExternals({
		whitelist: /\.css$/
	}),
	plugins: [
    new VueSSRServerPlugin(),
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'common.[chunkhash].css'
    // })
	]
};
