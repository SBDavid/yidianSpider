var path = require('path');

module.exports = {
  entry: './src/article.js',
  output: {
    filename: 'article.js',
    path: path.resolve(__dirname, '../httpServer/static/js')
  }
};