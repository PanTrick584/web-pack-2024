const path = require( "path" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const StylelintPlugin = require( "stylelint-webpack-plugin" );
const ESLintPlugin = require('eslint-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production";
let mode = "development";

if ( process.env.NODE_ENV === "production" ) mode = "production";

module.exports = {
    mode: mode,
    devtool: devMode ? "source-map" : false,
    entry: [
        "./src/js/index.js",
        "./src/styles/index.scss",
    ],
    output: {
        filename: devMode ? "main.js" : "main.[contenthash].js",
        path: path.resolve( __dirname, "dist" ),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { cacheDirectory: true },
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin( {filename: devMode ? "styles.css" : "styles.[contenthash].css"} ),
        new StylelintPlugin( {
            configFile: ".stylelintrc.json",
            files: "**/*.scss",
            fix: true,
            extensions: ['.scss']
        } ),
        new ESLintPlugin({
            extensions: ['.js', '.jsx'],
            exclude: 'node_modules',
            overrideConfigFile: './.eslintrc.json',
            fix: true
          })
    ],
    devServer: {
        contentBase: "./dist",
        hot: true
    }
};