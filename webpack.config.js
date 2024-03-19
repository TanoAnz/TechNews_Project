const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    entry: {
        index: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: { rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }
    ]},
    plugins:[
        new HtmlWebpackPlugin({
            title:  'TechNews',
            template: './src/index.html'
        })
    ],
    devServer: {
        port: 5000,
        open: true, 
        static: path.resolve(__dirname, 'dist')
    },
    mode: "development"
}