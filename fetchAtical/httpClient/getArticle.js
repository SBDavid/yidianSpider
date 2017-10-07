var http = require('http');
var querystring = require('querystring');
var debug = require('debug')('fetchArticle:http');
var chalk = require('chalk');

function requestOptionFactory(param) {
    return {
        hostname: 'www.yidianzixun.com',
        port: 80,
        path: '/article/' + param.itemid,
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        }
    }
}

function getAticleHtml(param) {
    return new Promise(function (resolve, reject) {
        //创建请求  
        var req = http.request(requestOptionFactory(param), function (res) {
            debug(chalk.grey('STATUS:'), chalk.yellow(res.statusCode));
            /* debug(chalk.grey('HEADERS:'), chalk.yellow(JSON.stringify(res.headers, null, 4))); */
            let rawData = '';
            res.setEncoding('utf-8');
            res.on('data', function (chunk) {
                rawData += chunk;
            });
            res.on('end', function () {
                resolve(rawData);
            });
        });
        req.on('error', function (err) {
            debug(chalk.red('获取数据错误：'), chalk.red(err));
            reject(err);
        });
        req.end();
    });
}

function getAticle(itemid) {
    return new Promise(function(resolve, reject) {
        getAticleHtml({itemid: itemid})
        .then(function(res) {
            var r1 = /^yidian\.docinfo.+$/m;
            var regResult = r1.exec(res);
            var docinfo = regResult[0].replace(/^yidian\.docinfo\s=\s/, '');
            docinfo = docinfo.replace(';', '');
            docinfo = JSON.parse(docinfo);
            resolve(docinfo.doc.images);
        })
    });
}

module.exports = getAticle;

