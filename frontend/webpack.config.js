const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'source-map' : false,
    target: 'web',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].bundle.js',
        clean: true
    },
    devServer: {
        hot: isDev,
        compress: true,
        open: true,
        port: 4444,
        historyApiFallback: true,
        allowedHosts: ['all'],
        client: {
            overlay: {
                warnings: false
            },
            logging: 'none',
        },
        static: {
            directory: path.resolve(__dirname, 'src')
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@my-types': path.resolve(__dirname, 'src/types'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@slices': path.resolve(__dirname, 'src/slices'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new DotenvPlugin(),
        new MiniCssExtractPlugin(),
        new ESLintPlugin({
            context: path.resolve(__dirname, 'src'),
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            exclude: 'node_modules',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
                    }
                }
            },

            {
                test: /\.(css)$/i,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },

            {
                test: /\.(png|jpeg|jpg|ico|gif|webp)$/,
                type: 'asset/resource'
            },

            {
                test: /\.svg/i,
                use: ['@svgr/webpack', 'url-loader']
            }
        ]
    }
}
