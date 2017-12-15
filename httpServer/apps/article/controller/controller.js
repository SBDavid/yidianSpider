var debug = require('debug')('httpServer:controller');
var chalk = require('chalk');

var cache = require('../../../apps/cache/cacheContainer'),
    articleApi = require('../../../../fetchAtical/persistence/api/article'),
    config = require('../../config');

/**
 * itemid 目标文章id
 * 推荐文章的cache名
 * 推荐文章在cache中的序号
 */
module.exports = function (itemid, relatedCateloge) {
    var targetArticle = null;
    return new Promise(function (resolve, reject) {
        cache.getAsync('lastestArticle', {
            filter: function (item) {
                return item.itemid === itemid;
            },
            condition: {
                itemid: itemid
            },
            amount: 1
        })
            /* 加载目标文章 */
            .then(function (articles) {
                if (articles.data.length === 0) {
                    debug(chalk.red('获取文章列表错误，没有找到文章 itemId:'), chalk.bgRed(itemid));
                    throw ('获取文章列表错误，没有找到文章');
                }
                targetArticle = articles.data[0];
                return Promise.resolve();
            })
            /* 加载相关文章 */
            .then(function () {

                var findIndex = cache.get(relatedCateloge, {
                    filter: function (item) {
                        return item.itemid === itemid;
                    }
                });

                if (findIndex.data.length > 0) {
                    var relatedIndex = findIndex.data[0].index;

                    var articles = cache.get(relatedCateloge, {
                        start: parseInt(relatedIndex) + 1,
                        end: parseInt(relatedIndex) + 10
                    }).data;

                    /* 根据不同的cateloge附加不同url */
                    function addUrl(articles, cateloge) {
                        return articles.map(function (article) {
                            article.url = config.getUrl('website') + "/article/" + article.itemid + "?cateloge=" + cateloge
                            return article;
                        })
                    }

                    articles = addUrl(articles, relatedCateloge);

                    targetArticle.relatedArticle = articles
                } else {
                    targetArticle.relatedArticle = [];
                }

                return Promise.resolve();
            })
            .then(function () {
                resolve(targetArticle);
            })
            .catch(function (err) {
                debug(chalk.red('获取文章列表错误'), chalk.bgRed(err));
                reject(err);
            })
    });
}