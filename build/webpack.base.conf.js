const { distPath, resolve, srcPath, version } = require('../config/index');

const HtmlWebpackPlugin = require("html-webpack-plugin"); // 实现文件的自动打包和引入
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: resolve('../src/main.js') // 配置入口文件
    },
    output: { // 配置出口文件
        filename: `static/js/[name].bundle.${version}.js`, // 配置输出文件名字的格式
        path: distPath // 输出的绝对路径
    },
    resolve: {
        extensions: ['.js', '.es', '.css', '.less'],
        alias: {}
    },
    module: { // 配置第三方 loader
        rules: [
            {
                test: /\.(htm|html)$/,
                include: srcPath,
                use: [ "raw-loader" ]
            },
            { // 处理 图片的 loader
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                include: srcPath,
                use: ["file-loader"]
            },
            { // 处理 字体的 loader
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                include: srcPath,
                use: ["file-loader"]
            },
            { // 处理 sass 文件的 loader
                test: /\.scss$/,
                include: srcPath,
                use: [{ loader: "style-loader" },
                {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader" 
                }]
            },
            {
                test: /\.js$/,
                include: srcPath,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [ //用 babel-loader 把 es6 转化成 es5
                            "@babel/preset-env"
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins:[  // 用来存放依赖的插件
        new CaseSensitivePathsPlugin(),
        new HtmlWebpackPlugin({
            hash: false,
            template: resolve('../index.html'), // 指定模板 html 文件
            filename: "index.html" // 输出的 HTML 文件名称
        }),
        new CopyWebpackPlugin(
            [{
                from: resolve('../src/assets'),
                to: resolve('../dist/assets'),
                toType: 'dir'
            }]
        )
    ]
}