var debug = require('debug')('fetchArticle:persistence');
var chalk = require('chalk');

var getArticle = require('./httpClient/getArticle');
var articleApi = require('./persistence/api/article');

function importArticles(channel_id, amount) {

    var param = {
        channel_id: channel_id,
        cend: amount
    }

    return new Promise(function(resolve, reject) {

        getArticle(param)
        .then(function(res) {
            // 通过promise.all写入所有的数据
            var promiseList = [];
            res.forEach(function(item) {
                promiseList.push(articleApi.update(item));
            });

            return Promise.all(promiseList);
        })
        .then(function(res) {
            var importAmount = res.filter(item => {
                return item === 1;
            }).length;
            debug(chalk.grey('articles导入成功 新导入的文章数量：'), chalk.yellow(importAmount));
            resolve({
                importAmount: importAmount
            })
        })
        .catch(function(err) {
            debug(chalk.red('articles导入失败'), chalk.red(err));
        })
    });
}

module.exports = importArticles;