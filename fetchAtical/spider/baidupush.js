/* 百度提交，先导入数据库 */
var debug = require('debug')('fetchArticle:baiduspider');
var chalk = require('chalk');

var baidupushApi = require('../persistence/api/baidupush'),
    config = require('../../httpServer/apps/config');

function addBaidupush(articles) {
    if (config.env !== 'pro' || articles.length === 0) {
        return Promise.resolve(0);
    }

    var urls = [];
    articles.forEach(function(element) {
        urls.push(config.getUrl('website') + '/article/' + element.itemid + '?cateloge=lastestList');
        urls.push(config.getUrl('website') + '/article/' + element.itemid + '?cateloge=mostViewedList');
    });

    return new Promise(function(resolve, reject) {
        baidupushApi.insert({
            url: urls.join('\n'),
            action: 'insert',
            amount: urls.length
        })
        .then(function(res) {
            debug(chalk.gray('百度爬虫数据插入成功 数据量：'), chalk.yellow(urls.length));
            resolve(1);
        })
        .catch(function(err) {
            debug(chalk.red('百度爬虫数据插入失败'), chalk.yellow(err));
            reject(err);
        })
    })
}


function addBaidupushUpdate() {
    if (config.env !== 'pro') {
        return Promise.resolve(0);
    }

    var urls = [];
    urls.push("http://m.xishuashua.site/");
    urls.push("http://m.xishuashua.site/list/mostViewedList");
    /* urls.push("http://m.xishuashua.site/list/lastestList"); */

    return new Promise(function(resolve, reject) {
        baidupushApi.insert({
            url: urls.join('\n'),
            action: 'update',
            amount: urls.length
        })
        .then(function(res) {
            debug(chalk.gray('百度爬虫数据插入成功 数据量：'), chalk.yellow(urls.length));
            resolve(1);
        })
        .catch(function(err) {
            debug(chalk.red('百度爬虫数据插入失败'), chalk.yellow(err));
            reject(err);
        })
    })

}

module.exports = {
    addBaidupush,
    addBaidupushUpdate
}