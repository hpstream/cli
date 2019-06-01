const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = function () {
	const common = require('./webpack.common.js');

	return merge(common, {
		mode: 'development',
		devtool: 'inline-source-map',
		devServer: {
			contentBase: "./build/", //监听代码变化自动提交并刷新网页
			proxy: { //配置代理
				'/web/webApi': {
					target: 'http://t1.zhuhuiyao.cn',
					secure: false,
					changeOrigin: true
				}
			}
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('dev')
				}
			})
		]
	})
};