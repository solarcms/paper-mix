let webpack = require('webpack')
let path = require('path')

module.exports = {
    entry: {
        app: './example/src/app.js',
        vendor: ['vue', 'vue-router']
    },

    output: {
        path: path.resolve(__dirname, 'example/dist'),
        filename: '[name].js',
        publicPath: './example'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './example'),
        compress: true,
        historyApiFallback: true,
        noInfo: true,
        port: 9000
    },
}

if (process.env.NODE_ENV === 'prod') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    )

    module.exports.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    )
}