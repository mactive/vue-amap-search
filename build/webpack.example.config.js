var path = require('path')
var webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: './src/main.ts',
  output: {
    path: resolve('dist/example'),
    publicPath: '/dist/example',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        use: [{
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            // transpileOnly: true
          }
        }]

      },
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
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 3030
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
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
  ])
}
