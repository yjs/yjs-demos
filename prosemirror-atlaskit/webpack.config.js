const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    'index': './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/prosemirror-atlaskit/dist/'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
    /*
    alias: {
      yjs: path.resolve(__dirname, '../../yjs'),
      'y-prosemirror': path.resolve(__dirname, '../../y-prosemirror'),
      lib0: path.resolve(__dirname, '../../lib0'),
      'y-protocols': path.resolve(__dirname, '../../y-protocols'),
      'y-websocket': path.resolve(__dirname, '../../y-websocket')
    }
    */
  }
}
