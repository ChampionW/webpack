//webpack.base.js
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { resolve as _resolve } from 'path';
import { src } from './paths';
export const entry = src + '/index.tsx';
export const output = {
    // eslint-disable-next-line no-undef
    path: _resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    publicPath: '',
};
export const module = {
    rules: [
        {
            use: ['babel-loader'],
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
        },
        {
            use: ['style-loader', 'css-loader', 'less-loader'],
            test: /\.(css|less)$/,
        },
        {
            type: 'asset',
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
        },
    ],
};
export const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    alias: {
        '@': src,
        '@c': src + '/components',
        '@m': src + '/model',
        '@s': src + '/services',
        '@t': src + '/types',
    },
};
export const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: './public/index.html',
    }),
    new ESLintPlugin()
];