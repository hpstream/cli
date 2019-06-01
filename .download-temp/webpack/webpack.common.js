const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const flatten = require('array-flatten')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const {
    entriesarr,
    configPlugins
} = require('./util/util');
const {
    common
} = require('../config/index.js');
const root = common.root;

const {
    VueLoaderPlugin
} = require('vue-loader')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
})
const config = {
    entry: entriesarr,
    output: {
        path: path.resolve(root, './build'),
        filename: function (chunk) {
            var chunkName = chunk.chunk.name;
            // console.log('===')
            // console.log(chunkName)
            return `${chunks(chunkName, 'js')}.[contenthash:8].js`;
        },
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.(html|php)$/,
                loader: 'html-loader' //处理图片
            },
            {
                test: /\.(js)$/,
                // exclude: /(node_modules)/,
                // include: [/(src)/, /(node_modules\/front-common)/],
                include: [/(src)/, /(node_modules)/],
                use: 'happypack/loader?id=happy-babel-js', // 增加新的HappyPack构建loader
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(less)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.(png|svg|jpg|gif|svga|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: function (file) {
                            var filename = file.replace(path.resolve(root, 'src') + path.sep, ''); //去掉路径
                             
                            filename = filename.split('.')[0] //去掉扩展名部分
                            // console.log(filename);
                            // console.log(file);
                            
                            return filename + '.[hash:8].[ext]';
                        }
                    }
                }]
            },
            {
                test: /\.(mp3|mp4)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: function (file) {
                            console.log('fileloader....')
                            var filename = file.replace(path.resolve(root, 'src') + path.sep, ''); //去掉路径

                             filename = filename.split('.')[0] //去掉扩展名部分
                             // console.log(filename);
                            return filename + '.[hash:8].[ext]';
                        }
                    }
                }]
            },
        ]
    },
    stats: {
        // Add asset Information
        assets: false,
        // Add children information
        children: false,

        // Add chunk information (setting this to `false` allows for a less verbose output)
        chunks: false,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                nocommon: {
                    test: (module, chunk) => {
                        if (module.resource) {
                            return module.resource.includes('node_modules') && !module.resource.includes('front-common');
                        }
                    },
                    chunks: 'initial',
                    name: 'nocommon',
                    filename: 'nocommon.[hash:8].js',
                    priority: 10, // 优先
                    enforce: true
                },
                common: { // 将第三方模块提取出来
                    // test: /(node_modules)/,

                    // test: /(node_modules)/,
                    // test: /node_modules\/(?!front-common)/,
                    test: (module, chunk) => {
                        if (module.resource) {                         
                            return module.resource.includes('node_modules') && module.resource.includes('front-common');
                        }
                    },
                    chunks: 'initial',
                    name: 'common',
                    filename: 'common.[hash:8].js',
                    priority: 10, // 优先
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([{
            from: "./src/common",
            to: "./common"
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            Vue: ['vue/dist/vue.min.js'],
            FastClick: 'fastclick',
            marked: 'marked',
            SVGA: "svgaplayerweb",
            Swiper: 'swiper'

        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: "[id].css"
        }),
        new webpack.HashedModuleIdsPlugin(),
        new HappyPack({
            id: 'happy-babel-js',
            loaders: [{
                loader: 'babel-loader'
                // options: {
                //     presets: ['@babel/preset-env'] // presets设置的就是当前js的版本
                //     // babelrc:true
                // }
            }],
            threadPool: happyThreadPool
        })
    ].concat(configPlugins)
}
//生成不同的chunk name
function chunks(item, type) {
    let s = item.split(path.sep);
    s.splice(s.length - 1, 0, type); // js文件会放在 /js/ 目录下，所以如果 entry是 app/test/index, 那么这里会把js定位到 app/test/js/index.js 上
    let chunk = s.join("/");
    return chunk;
}
// console.log('====')
// console.log(configPlugins)
// entriesarr,
// configPlugins
module.exports = config;