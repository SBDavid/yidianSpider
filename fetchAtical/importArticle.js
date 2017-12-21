var debug = require('debug')('fetchArticle:cmd');
var chalk = require('chalk');

var getArticleLink = require('./httpClient/getArticleLink');
var articleApi = require('./persistence/api/article');
var baidupush = require('./spider/baidupush');

function importArticles(channel_id, amount) {

    var param = {
        channel_id: channel_id,
        cend: amount || 10
    }
    return new Promise(function(resolve, reject) {
        var importAmount = 0;
        getArticleLink(param)
        .then(function(res) {
            // 通过promise.all写入所有的数据
            var promiseList = [];
            res.forEach(function(item) {
                // 写入fromId 作者编号
                item.fromId = item.wemedia_info.fromId;
                promiseList.push(articleApi.save(item));
            });

            return Promise.all(promiseList);
        })
        .then(function(res) {
            // 找到新的文章
            var newArticles = res.filter(item => {
                return item !==  false;
            });
            importAmount = newArticles.length;
            // 插入baidupush
            return baidupush.addBaidupush(newArticles);
        })
        .then(function() {
            debug(chalk.grey('articles导入成功 新导入的文章数量：'), chalk.yellow(importAmount));
            resolve({
                importAmount: importAmount
            })
        })
        .catch(function(err) {
            debug(chalk.red('articles导入失败'), chalk.red(err));
            reject(err);
        })
    });
}

module.exports = importArticles;