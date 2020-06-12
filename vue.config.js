const path = require('path')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const production = process.env.NODE_ENV === 'production'

module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    configureWebpack: {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Ignore all optional deps of moment.js
            new LodashModuleReplacementPlugin(),
        ],
        resolve: {
            alias: {
                '@ant-design/icons/lib/dist$': path.resolve(
                    __dirname,
                    './src/icons.js',
                ),
            },
        },
    },
    chainWebpack: config => {
        config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin()) //优化lodash
    },
}
