var debug = require('debug')('httpServer:controller');
var chalk = require('chalk');

var cache = require('../../../apps/cache/cacheContainer'),
    articleApi = require('../../../../fetchAtical/persistence/api/article');

/**
 * itemid 目标文章id
 * 推荐文章的cache名
 * 推荐文章在cache中的序号
 */    
module.exports = function(itemid, relatedCateloge, relatedIndex) {
    var targetArticle = null;
    return new Promise(function(resolve, reject) {
        Promise.resolve(cache.get('lastestArticle', {
            filter: function(item) {
                return item.itemid === itemid;
            }
        }))
        /* 加载目标文章 */
        .then(function(articles) {
            if (articles.length === 0) {
                debug(chalk.red('获取文章列表错误，没有找到文章 itemId:'), chalk.bgRed(itemid));
                reject('获取文章列表错误，没有找到文章');
            }
            targetArticle = articles.data[0];
            
            return Promise.resolve();
        })
        /* 加载相关文章 */
        .then(function() {
            targetArticle.relatedArticle = cache.get(relatedCateloge, {
                start: parseInt(relatedIndex) + 1,
                end: parseInt(relatedIndex) + 3
            }).data
            targetArticle.relatedArticle.currentCateloge = relatedCateloge;

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