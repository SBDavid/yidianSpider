var debug = require('debug')('httpServer:controller');
var chalk = require('chalk');

var articleApi = require('../../../../fetchAtical/persistence/api/article'),
    dateUtils = new (require('../../common/utils/date'))();

var contentUrl = '../../../../img/content/';

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
        content: article.images.content.map(item => {  item.url = contentUrl + item.filename; return item; }),
        date: date
    }
}

module.exports = function() {
    return new Promise(function(resolve, reject) {
        articleApi.find({images: {$ne: null}}, 10)
        .then(function(articles) {
            resolve(articles.map(item => {return getArticleListItem(item)}));
        })
        .catch(function(err) {
            debug(chalk.red('获取文章列表错误'), chalk.bgRed(err));
            reject(err);
        })
    });
}