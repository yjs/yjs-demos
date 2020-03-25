const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    atlaskit: './atlaskit.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/atlaskit/dist/'
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
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    publicPath: '/dist/'
  }
}
