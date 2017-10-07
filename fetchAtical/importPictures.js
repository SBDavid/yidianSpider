/**
 * 批量获取文章链接并保存文章中的图片链接
 */
var debug = require('debug')('fetchArticle:task');
var chalk = require('chalk');

var articleApi = require('./persistence/api/article');
var getAticle = require('./httpClient/getArticle');

function importPictureFromArticle(article, timeout) {
    return new Promise(function(resolve, reject){
        // 获取图片链接
        getAticle(article.itemid)
        .then(function(images) {
            // 保存图片链接
            return articleApi.update({itemid: article.itemid}, {images: images});
        })
        .then(function(res){
            setTimeout(function() {
                resolve(res);
            }, timeout);
        })
        .catch(function(err){
            debug(chalk.red('单篇文章图片导入失败'), chalk.bgRed(err));
            setTimeout(function() {
                reject(err);
            }, timeout);
        })
    });
}

async function importLoop(articles, timeout) {
    var result = 0;

    try {
        for(var i = 0; i < articles.length; i++) {
            result += await importPictureFromArticle(articles[i], timeout);
        }
    }
    catch (err) {
        return Promise.reject(err);
    }

    return Promise.resolve(result);
} 

/**
 * 批量获取文章链接并保存文章中的图片链接
 * 查询前n个未扒取的文章
 * 最后返回更新的数量
 */
function importPictures(amount, timeout) {

    return new Promise(function(resolve, reject) {

        articleApi.find({images: null}, amount)
        .then(function(articles) {
            debug(chalk.grey('查询到未扒取文章数量：'), chalk.yellow(articles.length));
            return importLoop(articles, timeout);
        })
        .then(function(amout){
            debug(chalk.grey('文章的中的图片已更新 文章数量：'), chalk.yellow(amout));
        })
        .catch(function(err) {
            debug(chalk.red('导入文章中的图片链接失败'), chalk.red(err));
            reject(err);
        })
    });
}

module.exports = importPictures;