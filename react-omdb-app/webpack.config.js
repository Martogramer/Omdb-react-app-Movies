const HtmlWebackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebackPlugin({
    template: './src/index.html',
    filename: './index.html'
})

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']     // rght to left: convierte css a js, Style loader lo carga en el proyecto
            }
        ]
    },
    plugins: [htmlPlugin]
};