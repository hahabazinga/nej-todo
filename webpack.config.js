const path = require('path');
const webpack = require('webpack');
const WebpackDevServerOutput = require('webpack-dev-server-output');

module.exports = {
  entry: './web/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'web/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    port: 8002,
    contentBase: path.resolve(__dirname, './web/'),
    open: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackDevServerOutput({
      path: "./web/dist/",
      isDel: true
  })
  ]
};