const path = require("path");
const webpack = require("webpack");
const vueConfig = require('./vue.loader.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
	devtool: false,
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		filename: '[name].[chunkhash].js'
	},
	resolve: {
		alias: {
			'public': path.resolve(__dirname, '../public')
		}
  },
  // optimization: {
  //   minimize: true
  // },
	module: {
		noParse: /es6-promise\.js$/,
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueConfig
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
           {
             loader: MiniCssExtractPlugin.loader,
           },
           "css-loader"
         ]
			}
		]
	},
	performance: {
		maxEntrypointSize: 300000,
		hints: 'warning'
	},
	plugins: [
    new VueLoaderPlugin(),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new MiniCssExtractPlugin({
				filename: 'common.[chunkhash].css'
			})
    ]
};
