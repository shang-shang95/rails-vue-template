const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

let entries = {}
glob.sync('./frontend/pages/**/*.js').map(function(file) {
  let name = file.split('/')[4].split('.')[0]
  entries[name] = file
})

module.exports = (env, argv) => {
  const IS_DEV = argv.mode === 'development'

  return {
    entry: {
      application: [
        './frontend/init/application.js',
        './frontend/init/application.scss'
      ],
      ...entries
    },
    // devtool: IS_DEV ? 'source-map' : 'none',
    output: {
      filename: 'javascripts/[name]-[hash].js',
      path: path.resolve(__dirname, 'public/assets/')
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'stylesheets/[name]-[hash].css'
      }),
      new ManifestPlugin({
        writeToFileEmit: true
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    ie: 11
                  },
                  useBuiltIns: 'usage'
                }
              ]
            ]
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.pug/,
          loader: 'pug-plain-loader'
        },
        {
          test: /\.(c|sc)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: path.resolve(
                  __dirname,
                  'public/assets/stylesheets/'
                )
              }
            },
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'images/',
            publicPath: function(path) {
              return 'images/' + path
            }
          }
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
                publicPath: '../'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js'
      },
      extensions: [
        '.js',
        '.scss',
        'css',
        '.vue',
        '.jpg',
        '.png',
        '.gif',
        '.woff',
        '.woff2',
        '.svg',
        '.ttf',
        '.eot',
        ' '
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /.(c|sa)ss/,
            name: 'style',
            chunks: 'all',
            enforce: true
          }
        }
      },
      minimize: true
    },
    devServer: {
      host: 'localhost',
      port: 3035,
      publicPath: 'http://localhost:3035/public/assets/',
      contentBase: path.resolve(__dirname, 'public/assets/'),
      hot: true,
      disableHostCheck: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      }
    }
  }
}
