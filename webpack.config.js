const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintPlugin = require("eslint-webpack-plugin");

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          port: 8080,
          // static: {
          //   directory: path.join(__dirname, "src"),
          // },
        },
      };

const esLintPlugin = (isDev) => (isDev ? [] : [new EslintPlugin({ extensions: ["ts", "js"] })]);

module.exports = ({ develop }) => ({
  mode: develop ? "development" : "production",
  devtool: develop ? "inline-source-map" : "none",
  entry: { asdasd: "./src/index.ts" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|pnh|jpg|jpeg|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(?:woff(2)|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: "Demo webpack",
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "./public", to: "sss" }],
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    ...esLintPlugin(develop),
  ],
  ...devServer(develop),
});