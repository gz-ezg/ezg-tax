const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    // pages: {
    //     index: {
    //         entry: "src/main.js",
    //         template: "public/index.html",
    //         filename: "index.html"
    //     },
    //     page2: {
    //         entry: "src/main.js",
    //         template: "public/index.html",
    //         filename: "page2.html"
    //     }
    // },
    lintOnSave: false,
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
    },
    devServer: {
        proxy: {
            "/api": {
                // target: "http://192.168.0.220:9000",
                target: "http://tax.zgcfo.com/api/",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        disableHostCheck: true,
    },
    // configureWebpack: {
    //     plugins: [
    //         new CopyWebpackPlugin([
    //             {
    //               from: path.resolve(__dirname, '../public/static'),
    //               to: "/",
    //               ignore: ['.*']
    //             }
    //         ])
    //     ]
    // }
}