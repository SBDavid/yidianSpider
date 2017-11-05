var debug = require('debug')('httpServer:cache');
var chalk = require('chalk');
var articleApi = require('../../../fetchAtical/persistence/api/article'),
    dateUtils = new (require('../common/utils/date'))(),
    config = require('../config');

var surfaceUrl = config.getUrl('img') + '/img/surface/',
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

var loader = function() {
    return new Promise(function(resolve, reject) {
        articleApi.find({images: {$ne: null}, hide: false}, 100)
        .then(function(articles) {
            resolve(articles.map(item => {return getArticleListItem(item)}));
        })
        .catch(function(err) {
            debug(chalk.red('获取文章列表错误'), chalk.bgRed(err));
            reject(err);
        })
    })
}

loader.loaderName = 'lastestArticle';

module.exports = loader;

