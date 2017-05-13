var webpack = require('webpack'),
    path = require('path'),
    VERSION = JSON.stringify(require("./package.json").version);

module.exports = {
    entry: './src/rx-pubsub.ts',
    output: {
        // export itself to a global var
        libraryTarget: 'umd',
        umdNamedDefine: true,
        // name of the global var: 'Hermes'
        filename: 'rx-pubsub.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/static/'
    },
    //end up with separate files that will be loaded by the browser only when required.
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: false,
            beautify: true,
            mangle: false
        }),
        new webpack.DefinePlugin({
            __VERSION__: VERSION
        }),
        new webpack.BannerPlugin('version: ' + VERSION, {raw: false, entryOnly: true})
    ],
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts', exclude: 'node_modules'}
        ]
    }
}