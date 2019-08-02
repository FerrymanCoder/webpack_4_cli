const { resolve, srcPath, theme, version } = require('../config/index');

const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 压缩 css 文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
    entry: {
        app: resolve('../src/main.js')
    },
    mode: 'production', // 压缩代码
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(sc|c|le)ss$/,
                include: [srcPath],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "sass-loader",
                    `less-loader?{javascriptEnabled: true, modifyVars: ${JSON.stringify(theme)}}`
                ]
            }
        ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            cacheGroups: {
            commons: {
                name: 'common',
                priority: 10,
                test: /[\\/]node_modules[\\/]/,
                chunks: 'all',
                minChunks: 1 // 引用1次就要打包出来
            }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `static/css/[name].${version}.css`
        }),
        new CleanWebpackPlugin({
            root: __dirname.replace('webpackset', 'dist')
        }),
        new webpack.DefinePlugin({
            __DEV__: false
        })
    ]
})