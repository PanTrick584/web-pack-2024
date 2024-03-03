const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
const devMode = process.env.NODE_ENV !== "production";

if (process.env.NODE_ENV === 'production') mode = "production"
// add hot update for php
// if (devMode) {
//     // only enable hot in development
//     plugins.push(new webpack.HotModuleReplacementPlugin());
//   }

module.exports = {
    mode: mode,
    // devtool: devMode ? "source-map" : "none",
    entry: [
        "./src/js/index.js",
        "./src/styles/index.scss"
    ],
    output: {
        filename: "[name].[contenthash].js",
        clean: true
    },
    module: {
        rules: [
          {
            test: /(\.scss)$/,
            use: [
                devMode ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
          },
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
              },
            },
          },
        ],
      },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].[contenthash].css",
            // chunkFilename: '[id].[hash].css'
        })
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}