const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    bundle: './dashboard/src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dashboard/dist'),
    filename: 'js/[name].[hash].js',
    publicPath: ''
  },

  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }  
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    modules: [path.resolve(__dirname, 'dashboard/src'), path.resolve(__dirname, 'dashboard/assets'), 'node_modules']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'dashboard/assets/_webpack_tpl.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        },
      }
    } 
  },


  devServer: {
    contentBase: path.join(__dirname, 'dashboard/dist'),
    port: 3001,
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000'
      }
    },
    setup(app) {
      app.get('/assets/*', (req, res) => {
        res.sendFile(__dirname + '/dashboard' + req.path)
      })
    }
  },

}