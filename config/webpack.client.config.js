const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./webpack.base.config");
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
	entry: {
		app: './src/entry-client.js'
	},
	resolve: {
		alias: {
			'axios-client': './axios-client.js'
		}
  },
  optimization: {
    splitChunks: {},
    minimize: true
  },
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new SWPrecachePlugin({
			cacheId: 'headline-news',
			filename: 'service-worker.js',
			minify: 'true',
			dontCacheBustUrlsMatching: /./,
			staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
			runtimeCaching: [
				{
					urlPattern: '/',
					handler: 'networkFirst'
				},
				{
					urlPattern: '/article/:source',
					handler: 'networkFirst'
				}
			]
		}),
		new VueSSRClientPlugin()
	]
});

