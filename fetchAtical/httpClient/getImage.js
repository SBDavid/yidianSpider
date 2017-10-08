/**
 * 获取一点资讯base64图片
 */

var http = require('http');
var debug = require('debug')('fetchArticle:http');
var chalk = require('chalk');

function requestOptionFactory(url) {
    return {
        hostname: 'i1.go2yd.com',
        //hostname: 'mat1.gtimg.com',
        port: 80,
        path: url.replace('http://i1.go2yd.com', ''),
        //path: '/fashion/sitong/2017.10.8/3604801.jpg',
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
            debug(chalk.grey('STATUS:'), chalk.yellow(res.statusCode));
            var type = res.headers["content-type"];
            debug(chalk.grey('content-type:'), chalk.yellow(type));
            let rawData = '';
            res.setEncoding('binary');
            res.on('data', function (chunk) {
                rawData += chunk;
            });
            res.on('end', function () {
                var base64 = require('node-base64-image');
                
                let defaultOptions = { filename: '../images/yidian' };
                let imageData = new Buffer(rawData, 'binary');
                
                base64.decode(imageData, defaultOptions, (err, response) => {
                    console.info(err, response);
                });
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

getImage('http://i1.go2yd.com/image.php?url=0HPN239nWw&type=thumbnail_2x2')
.then(function(res){
    console.info(res)
})