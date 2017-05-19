var webpack = require('webpack'),
    path = require('path'),
    VERSION = JSON.stringify(require("./package.json").version);
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: './src/rx-pubsub.ts',
    output: {
        // export itself to a global var
        libraryTarget: 'umd',
        umdNamedDefine: true,
        // name of the global var: 'Hermes'
        filename: 'rx-pubsub.min.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/static/'
    },
    //end up with separate files that will be loaded by the browser only when required.
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false,
            }
        }),
        new webpack.DefinePlugin({
            __VERSION__: VERSION
        }),
        new webpack.BannerPlugin('version: ' + VERSION, {raw: false, entryOnly: true}),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts', exclude: 'node_modules'}
        ]
    }
}