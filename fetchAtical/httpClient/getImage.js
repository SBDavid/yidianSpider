/**
 * 获取一点资讯base64图片
 */

var http = require('http');
var debug = require('debug')('fetchArticle:http');
var chalk = require('chalk');

function requestOptionFactory(url) {
    return {
        hostname: 'i1.go2yd.com',
        port: 80,
        path: url.replace('http://i1.go2yd.com', ''),
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
        }
    }
}

function getImage(url) {
    return new Promise(function (resolve, reject) {
        //创建请求  
        var req = http.request(requestOptionFactory(url), function (res) {
            debug(chalk.grey('STATUS:'), chalk.yellow(res.statusCode), chalk.grey('URL:'), chalk.yellow(url));
            var imageData = {
                contentType: res.headers["content-type"],
                filename: /".+\..+"/.exec(res.headers['content-disposition'])[0].replace(/"/g, '')
            }
            let rawData = '';
            res.setEncoding('binary');
            res.on('data', function (chunk) {
                rawData += chunk;
            });
            res.on('end', function () {
                imageData.image = rawData;
                resolve(imageData);
            });
        });
        req.on('error', function (err) {
            debug(chalk.red('获取数据错误：'), chalk.red(err));
            reject(err);
        });
        req.end();
    });
}

module.exports = getImage;