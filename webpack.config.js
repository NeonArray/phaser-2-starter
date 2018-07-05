const webpack = require('webpack');
const path = require('path');
const BrowerSyncPlugin = require('browser-sync-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'public');
const PHASER_DIR = path.join(__dirname, '/node_modules/phaser');
const NODE_ENV = process.env.NODE_ENV;


const config = {
    entry: `${APP_DIR}/index.js`,
    output: {
        path: BUILD_DIR,
        filename: 'assets/js/bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [APP_DIR, 'node_modules'],
        alias: {
            constants: `${APP_DIR}/constants`,
            phaser: path.join(PHASER_DIR, 'build/custom/phaser-split.js'),
            pixi: path.join(PHASER_DIR, 'build/custom/pixi.js'),
            p2: path.join(PHASER_DIR, 'build/custom/p2.js'),
        },
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                include: APP_DIR,
            },
            {
                test: /pixi\.js/,
                use: [{
                    loader: 'expose-loader',
                    options: 'PIXI',
                }],
            },
            {
                test: /phaser-split\.js$/,
                use: [{
                    loader: 'expose-loader',
                    options: 'Phaser',
                }],
            },
            {
                test: /p2\.js/,
                use: [{
                    loader: 'expose-loader',
                    options: 'p2',
                }],
            },
        ],
    },
    plugins: NODE_ENV === 'production' ? [ new webpack.optimize.UglifyJsPlugin() ] : [
        new BrowerSyncPlugin({
            host: 'localhost',
            port: 8000,
            server: {
                baseDir: [BUILD_DIR],
            },
        }),
    ],
};

module.exports = config;

