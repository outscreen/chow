const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',

    entry: {
        app: path.resolve(__dirname, '../src/app'),
    },

    output: {
        path: path.resolve(__dirname, '../../public/build/'),
        filename: 'app.js',
    },

    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({}),
    ] : [],

    node: {
        __dirname: false,
    },

    resolve: {
        extensions: ['', '.js'],
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                },
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
            },
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"},
            {test: /\.gif$/, loader: "url-loader?mimetype=image/png"},
            {test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]"},
        ],
    },

    exclude: /node_modules/,
};
