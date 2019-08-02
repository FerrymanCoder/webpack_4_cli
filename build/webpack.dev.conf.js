const { distPath, host, port, resolve, srcPath, theme } = require('../config/index');

const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(baseConfig, {
    entry: {
        app: resolve('../src/main.js')
    },
    mode: 'development', // 不压缩代码，加快编译速度
    devtool: 'source-map', // 提供源码映射文件调试使用
    module: {
        rules: [
            {
                test: /\.(sc|c|le)ss$/,
                include: [srcPath],
                use: [
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                    { loader: 'less-loader', options: { sourceMap: true, javascriptEnabled: true, modifyVars: theme } }
                ]
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          __DEV__: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host,
        port,
        inline: true,
        hot: true,
        disableHostCheck: true,
        historyApiFallback: true, // using html5 router.
        contentBase: distPath,
        proxy: {}
    }
})

// module.exports = {
//     entry: {
//         app: "./src/main.js" // 配置入口文件
//     },
//     output: { // 配置出口文件
//         filename: "[name].bundle.js", // 配置输出文件名字的格式
//         path: path.join(__dirname, "./dist") // 输出的绝对路径
//     },
//     devServer: {
//         contentBase: "./dist",
//         port: 3000, // 本地服务器端口号
//         hot: true, // 热加载
//         inline: true,
//     },
//     module:{ // 用来存放依赖的模块
//         rules: [
//             {
//                 test: /\.(htm|html)$/,
//                 use: [ "raw-loader" ]
//             },
//             { // 处理 css 文件的 loader
//                 test: /\.css$/,
//                 use: ["style-loader", "css-loader"]
//             },
//             { // 处理 图片的 loader
//                 test: /\.(png|jpg|jpeg|svg|gif)$/,
//                 use: ["file-loader"]
//             },
//             { // 处理 字体的 loader
//                 test: /\.(woff|woff2|eot|ttf|otf)$/,
//                 use: ["file-loader"]
//             },
//             { // 处理 sass 文件的 loader
//                 test: /\.scss$/,
//                 use: [{ loader: "style-loader" },
//                 {
//                     loader: "css-loader"
//                 }, {
//                     loader: "sass-loader" 
//                 }]
//             },
//             { // 处理 less 文件的 loader
//                 test: /\.less$/,
//                 use: ["style-loader", "css-loader", "less-loader"]
//             },
//             {
//                 test: /\.js$/,
//                 use: {
//                     loader: "babel-loader",
//                     options: {
//                         presets: [ //用 babel-loader 把 es6 转化成 es5
//                             "@babel/preset-env"
//                         ],
//                         plugins: [
//                             ["@babel/plugin-proposal-decorators", { "legacy": true }],
//                             ["@babel/plugin-proposal-class-properties", { "loose": true }],
//                             "@babel/plugin-transform-runtime"
//                         ]
//                     }
//                 },
//                 exclude: /node_modules/
//             }
//         ]
//     },
//     plugins:[  // 用来存放依赖的插件
//         new HtmlWebpackPlugin({
//             template: "./index.html", // 指定模板 html 文件
//             filename: "index.html" // 输出的 HTML 文件名称
//         }),
//         new webpack.HotModuleReplacementPlugin(), // 热更新所需插件
//         new webpack.NamedModulesPlugin(), // 热更新所需插件
//         new CleanWebpackPlugin({ dry: true }), // 清除缓存中上一次打包的不用的文件
//     ],
// }