var path = require('path');

module.exports = {
  entry: {
    'article':'./src/article.js', 
    'list': './src/list.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../httpServer/static/js')
  }
};