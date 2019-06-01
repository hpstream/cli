const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const fs = require('fs');
const common = require('./webpack.common.js');

const basicPath = process.cwd().substring(process.cwd().lastIndexOf(path.sep) + 1);
const publicPath = "https://tdev.kuaishebao.com/web/" + basicPath + "/"; //dev环境js和css的路径

const cleanOptions = "./build"; //需要清除的目录
const MyPlugin = require("./plugins/myplugin.js");

module.exports = function() {
    return merge(common, {
        mode: 'development',
        output: {
            publicPath: publicPath
        },
        plugins: [
            new CleanWebpackPlugin(cleanOptions),
            new UglifyJSPlugin({
                output: {
                    quote_keys: true,
                    keep_quoted_props: true,
                    screw_ie8: false
                },
                mangleProperties: {
                    screw_ie8: false
                },
                compress: {
                    properties: false,
                    screw_ie8: false,
                    warnings: false
                },
                mangle: {
                    screw_ie8: false,
                    except: ['e']
                },
                sourceMap: false
            }),
            new OptimizeCssAssetsPlugin(),
            new MyPlugin({ options: publicPath })
        ]
    })
};