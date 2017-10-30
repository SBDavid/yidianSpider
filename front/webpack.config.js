var path = require('path');
var webpack = require("webpack");
var config = require('../httpServer/apps/config'); 

module.exports = {
  entry: {
    'article': './src/article.js',
    'list': './src/list.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../httpServer/static/js')
  },
  plugins: [
    new webpack.DefinePlugin({
      STATIC_URL: JSON.stringify(config.getUrl('static'))
    })
  ]
};