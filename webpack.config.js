let webpack = require('webpack')
let path = require('path')
let WebpackNotifierPlugin = require('webpack-notifier')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: './example/src/app.js',
        vendor: ['vue', 'vue-router']
    },

    output: {
        path: path.resolve(__dirname, 'example/dist'),
        filename: 'js/[name].js',
        publicPath: '/'
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
                        js: 'babel-loader',
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            },


            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },

            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    use: "css-loader!sass-loader"
                })
            },

            {
                test: /\.(png|jpg|gif|webp)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]?[hash]',
                    publicPath: '/'
                }
            },

            {
                test: /\.(woff2?|ttf|eot|svg|otf)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]?[hash]',
                    publicPath: '/'
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
        }),
        new ExtractTextPlugin("css/[name].css"),
        new WebpackNotifierPlugin({
            title: 'Paper Mix',
            alwaysNotify: true,
            contentImage: './logo.png'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './example/dist'),
        compress: true,
        historyApiFallback: true,
        noInfo: true,
        port: 3000
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
