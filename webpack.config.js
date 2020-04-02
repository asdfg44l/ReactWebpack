const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = { 
    context: path.resolve(__dirname, 'src'),
    entry: ['./app.jsx'],
    output: {
        path: path.resolve(__dirname, 'ReactTest'),
        filename: 'js/bundle.js',
        publicPath: '/ReactTest/'
    },
    resolve: {
        alias: {
            '@': 'D:\\react_learning\\ReactWebpack\\src',
        },
    },
    module: {
        rules: [
            {   
                test: /\.jsx$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: { 
                    loader: 'babel-loader', 
                    options: { 
                        presets: ['@babel/preset-env'] 
                    } 
                } 
            },
            {
                test: /\.(scss|sass)$/i,
                use: [
                    // fallback to style-loader in development
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [ require('autoprefixer') ]
                            }
                        }
                    },
                    "sass-loader"
                ],
            },
            {
                test: /\.(jpe?g|png|gif|webp|bmp)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'image/[name].[ext]',
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: "raw-loader" // loaders: ['raw-loader']，這個方式也是可以被接受的。
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '../public/index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/all.css",
            chunkFilename: "[id].css"
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            'ReactDOM': 'react-dom'
        }),
        new Dotenv({
            path: `.env.${process.env.NODE_ENV}`,
            safe: true
        })
    ],
    devServer: {
        // host: '172.16.12.186',
        contentBase: path.join(__dirname, 'ReactTest'),
        port: 8000,
    },
}
