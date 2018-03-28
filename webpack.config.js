const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    merge = require("webpack-merge"),
    parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, "public/js/main.js"),
    build: path.join(__dirname, "dist"), 
}; 

const commonConfig = merge([ 
    {
        resolve: {
            extensions: ['.js']
        },
        //context: path.resolve(__dirname, "app"),
        entry: {
            app: ['babel-polyfill', PATHS.app],
        },
        output: {
            path: PATHS.build,
            filename: "[name].js",
        }, 
        plugins: [ 
            new HtmlWebpackPlugin({
                title: 'Fractal Tree', 
                filename: 'index.html',
                template: './public/index.html',
                favicon: './public/favicon.ico',
            }),
            //new ExtractTextPlugin("./public/css/bulma.css"),
            // new ExtractTextPlugin("./public/css/styles.css"),
            // //new ExtractTextPlugin("./public/css/font-awesome.min.css"),
            // new StyleExtHtmlWebpackPlugin({
            //     minify: true
            //  }) 
        ],
    },
    parts.loadFonts({
        options: {
            name: "[name].[ext]",
        },
    }),
    parts.loadJavaScript({ include: PATHS.app }),
]); 

const productionConfig = merge([
    { mode: 'production' },
    parts.extractCSS({
        use: "css-loader",
    }),
    parts.loadImages({
        options: {
            limit: 15000,
            name: "[name].[ext]",
        }, 
    }),
]); 

const developmentConfig = merge([
    { mode: 'development' },
    parts.devServer({
        host: '0.0.0.0', 
        port: 3000,
    }),
    parts.loadCSS(),
    parts.loadImages()
]);

module.exports = env => {
    if (env === "production") {
        return merge(commonConfig, productionConfig);
    }
    return merge(commonConfig, developmentConfig);
};  
