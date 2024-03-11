const path = require( "path" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const StylelintPlugin = require( "stylelint-webpack-plugin" );
const devMode = process.env.NODE_ENV !== "production";
let mode = "development";

if ( process.env.NODE_ENV === "production" ) mode = "production";
// add hot update for php
// if (devMode) {
//     // only enable hot in development
//     plugins.push(new webpack.HotModuleReplacementPlugin());
//   }

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
                test: /\.(js|jsx)$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: {
                    loader: "eslint-loader",
                    options: { fix: true }
                }
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
            files: "**/*.scss", // Adjust file patterns as needed
            fix: true,
        } )
    ],
    devServer: {
        contentBase: "./dist",
        hot: true
    }
};