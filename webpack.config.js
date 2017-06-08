const webpack = require('webpack');
const path = require('path');
const ExtractPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: ['./src/remus.js', './src/remus.css'],
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'remus.min.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractPlugin.extract({
					use: {
						loader: 'css-loader',
						options: {
							minimize: true
						}
					}
				})			
			}
		]
	},
	plugins: [
		new ExtractPlugin('remus.min.css'),
		new webpack.optimize.UglifyJsPlugin()
	]
};