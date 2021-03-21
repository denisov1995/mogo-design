const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { title } = require('process')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        },
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const cssLoaders = extra =>{
    const loaders = [
        {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: '',
        },
    },
        'css-loader',]

        if (extra) {
            loaders.push(extra)
        }
        return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jpg', '.json', '.xml']
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/images'),
                    to: path.resolve(__dirname, 'dist/images'),                   
                },
                // {
                //     from: path.resolve(__dirname, 'src/fonts/'),
                //     to: path.resolve(__dirname, 'dist/fonts'),
                // },
                // {
                //     from: path.resolve(__dirname, 'src/index'),
                //     to: path.resolve(__dirname, 'dist/js'),
                // },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg)$/,
                use: [{
                    loader: 'file-loader?name=./images/[name].[ext]'
                }]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [{
                    loader: 'file-loader?name=./fonts/[name].[ext]'
                }]
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }
        ]

    }
}

