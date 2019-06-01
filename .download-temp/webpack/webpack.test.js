const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const fs = require('fs');
const common = require('./webpack.common.js');

const config = require('../config/index.js');
const root = config.common.root;
const cleanOptions = "./build"; //需要清除的目录
const vConsole = require("../plugins/vConsole.js");
const Rem = require("../plugins/rem.js");
module.exports = function () {
	return merge(common, {
		mode: 'production',
		optimization:{
			// minimize:false
		},
		output: {
			publicPath: config.prod.publicPath
		},
		plugins: [
			new CleanWebpackPlugin(cleanOptions,{
				root: root
			}),
			new OptimizeCssAssetsPlugin(),
			new vConsole(),
			new Rem()
		]
	})
};

// const merge = require('webpack-merge');

// module.exports = function () {
// 	const dev = require('./webpack.dev.js');
// 	console.log(dev().output.publicPath)
// 	const publicPath = dev().output.publicPath.replace(/tdev.kuaishebao.com/, "qiniuh5.wodidashi.com"); //测试环境js和css的路径

// 	return merge(dev, {
// 		mode: 'development',
// 		output: {
// 			publicPath: publicPath
// 		}
// 	})
// };