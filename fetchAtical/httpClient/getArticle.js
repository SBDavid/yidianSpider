var http = require('http');
var querystring = require('querystring');
var debug = require('debug')('fetchArticle:http');
var chalk = require('chalk');

var defaultParam = {
    channel_id: 'm5565',
    cstart: 0,
    cend: 1,
    infinite: true,
    refresh: 1,
    __from__: 'pc',
    multi: 5,
    appid: 'web_yidian',
    _: '1506669338983'
};

function requestOptionFactory(param) {
    var queryObj = Object.assign({}, defaultParam, param);
    return {
        hostname: 'www.yidianzixun.com',
        port: 80,
        path: '/home/q/news_list_for_channel?' + querystring.stringify(queryObj),
        method: 'GET'
    }
}

function getArticles(param) {
    return new Promise(function (resolve, reject) {
        //创建请求  
        var req = http.request(requestOptionFactory(param), function (res) {
            debug(chalk.grey('STATUS:'), chalk.yellow(res.statusCode));
            debug(chalk.grey('HEADERS:'), chalk.yellow(JSON.stringify(res.headers, null, 4)));
            let rawData = '';
            res.setEncoding('utf-8');
            res.on('data', function (chunk) {
                rawData += chunk;
            });
            res.on('end', function () {
                var articles = JSON.parse(rawData);
                debug(chalk.gray('响应结束，数据条数：'), chalk.yellow(articles.result.length));
                resolve(articles.result);
            });
        });
        req.on('error', function (err) {
            debug(chalk.red('获取数据错误：'), chalk.red(err));
            reject(err);
        });
        req.end();
    });
}

module.exports = getArticles;

