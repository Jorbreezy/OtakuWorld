const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  return {
    mode: env.NODE_ENV,
    entry: "./client/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    devServer: {
      proxy: {
        '/': 'http://localhost:3000',
      },
      contentBase: path.join(__dirname, "client"),
      port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.(jsx)?/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ["@babel/env", "@babel/react"],
          },
        },
        {
          test: /\.(tsx|ts)?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(css|scss)/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"],
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./client/index.html",
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
    },
  };
};
