const path = require('path');
const resolve = path.resolve;
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './index.js'
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: 'index.min.js',
    library: "__UI",
  },
  resolve: {
    extensions: ['.js', '.less'],
    alias: {
      '@': resolve('src'),
      '@common': resolve('src/common'),
      '@components': resolve('src/components'),
      '@test': resolve('src/test'),
    }
  },
  module: {
    rules: [{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(['css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => autoprefixer({
              browsers: ['last 3 versions', '> 1%']
            })
          },
        }, 'less-loader'
      ])
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    // minify CSS
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    // minify HTML
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
  ]
};