/**
 * Created by Yy on 2017/7/17.
 */
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './public/script/main.js',
    output: {
        path: path.resolve('./public/script/'),
        filename: 'main.bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use: [
                    {loader: 'babel-loader'},
                ]
            },

            {
                test:/\.css$/,
                use:[ 'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders: '1',
                            minimize: true
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:function(){
                                return [
                                    require('autoprefixer')({broswers:['last 5 versions']})
                                ];
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function(){
                    return [
                        require("autoprefixer")({
                            browsers: ['ie>=8','>1% in CN']
                        })
                    ]
                }
            }
        }),
        new ExtractTextPlugin('[name].css'),
        // new UglifyJSPlugin(),
    ]
};