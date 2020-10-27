import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";

const common: webpack.Configuration = {
  entry: {
    index: "./src/index.tsx",
    api: "./src/runtime.ts",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: "./src/**/*",
      },
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Bibler - Bücherei App'
    }),
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

export default common;