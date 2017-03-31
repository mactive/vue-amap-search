var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  entry: './src/main.ts',
  output: {
    path: resolve('dist/example'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            esModule: true,
            loaders: {
              'less': 'vue-style-loader!css-loader!less-loader',
            }
          }
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader!css-loader'
        }]
      }
    ]
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
})
