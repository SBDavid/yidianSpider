var debug = require('debug')('httpServer:controller');
var chalk = require('chalk');

var articleApi = require('../../../../fetchAtical/persistence/api/article'),
    dateUtils = new (require('../../common/utils/date'))(),
    config = require('../../config');

var contentUrl = config.getUrl('img') + '/img/content/',
    staticUrl = config.getUrl('img') + '/img/static/';

var contentStrateges = {

    inner: function(content) {
        if (content.animated === true) {
            content.url = staticUrl + content.filename; 
            content.animatedurl = contentUrl + content.filename;
        } else {
            content.url = contentUrl + content.filename; 
        }
        return content; 
    },
    outter: function(content) {
        if (content.animated === true) {
            content.animatedurl = content.url;
            content.url =`${content.url}&type=thumbnail_${content.width}x${content.height}`; 
        } else {
            content.url = content.url; 
        }
        return content; 
    }
}

var getArticleListItem = function(article) {
    var timePassed = dateUtils.timeFromNowYidian(article.date);
    var date;
    if (timePassed.minutes < 60) {
        date = timePassed.minutes + '分钟前';
    } else if (timePassed.hours < 24){
        date = timePassed.hours + '小时前';
    } else if (timePassed.days < 7) {
        date = timePassed.days + '天前';
    } else {
        var moment = dateUtils.getMomentYidian(article.date);
        date = dateUtils.getNormalFormatDate(moment);
    }
    return {
        title: article.title,
        itemid: article.itemid,
        readCount: article.readCount,
        content: article.images.content.map(contentStrateges[config.contentStratege]),
        date: date
    }
}

module.exports = function(itemid) {
    var targetArticle = null;
    return new Promise(function(resolve, reject) {
        articleApi.find({
            images: {$ne: null},
            itemid: itemid
        }, 1)
        .then(function(articles) {
            if (articles.length === 0) {
                debug(chalk.red('获取文章列表错误，没有找到文章 itemId:'), chalk.bgRed(itemid));
                reject('获取文章列表错误，没有找到文章');
            }
            targetArticle = getArticleListItem(articles[0]);
            // 阅读数+1
            return articleApi.update({itemid: itemid}, {readCount: targetArticle.readCount + 1 || 0});
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