var debug = require('debug')('httpServer:controller');
var chalk = require('chalk');

var cache = require('../../../apps/cache/cacheContainer'),
    articleApi = require('../../../../fetchAtical/persistence/api/article');
module.exports = function(itemid) {
    var targetArticle = null;
    return new Promise(function(resolve, reject) {
        Promise.resolve(cache.get('lastestArticle', {
            filter: function(item) {
                return item.itemid = itemid;
            }
        }))
        .then(function(articles) {
            if (articles.length === 0) {
                debug(chalk.red('获取文章列表错误，没有找到文章 itemId:'), chalk.bgRed(itemid));
                reject('获取文章列表错误，没有找到文章');
            }
            targetArticle = articles.data[0];
            // 阅读数+1
            articleApi.update({itemid: itemid}, {readCount: targetArticle.readCount + 1 || 0});
            targetArticle.readCount++;
            return Promise.resolve();
        })
        .then(function(){
            resolve(targetArticle);
        })
        .catch(function(err) {
            debug(chalk.red('获取文章列表错误'), chalk.bgRed(err));
            reject(err);
        })
    });
}