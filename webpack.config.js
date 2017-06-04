const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

const HtmlCopyWebpackPluginConfig = new CopyWebpackPlugin([
    { from: 'styles.css', to: 'styles.css'}
])

module.exports = {
    entry: __dirname + '/app.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build'
    },
    plugins: [HtmlWebpackPluginConfig, HtmlCopyWebpackPluginConfig]
};