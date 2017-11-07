var path = require('path');
var fs = require('fs');
var os = require('os');
var webpack = require("webpack");
var config = require('../httpServer/apps/config');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel');

/* 多个入口打包 */
let entryObj = {};
let getEntry = (dir) => {
	fs.readdirSync(dir).map((item) => {
		entryObj[path.basename(item, '.js')] = dir + item;
	});
}
getEntry('./src/');

var config = {
	devtool: process.env.NODE_ENV == 'production' ? false : "source-map",
	entry: entryObj,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist')
	},
	plugins: [
		new webpack.DefinePlugin({
			STATIC_URL: JSON.stringify(config.getUrl('static'))
		})
	]
};

if (process.env.NODE_ENV == 'production') {
	config.plugins.push(new UglifyJsParallelPlugin({
		workers: os.cpus().length,
		mangle: true,
		comments: false,
		compressor: {
			warnings: false
		}
	}));
}

module.exports = config;