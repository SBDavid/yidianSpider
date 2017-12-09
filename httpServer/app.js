var debug = require('debug')('httpServer:app');
var chalk = require('chalk');

var path = require('path');
var express = require('express');
var app = express();

var config = require('./apps/config'),
	spiderLog = require('./apps/spiderlog/spiderlog');

// gzip
/* var compression = require('compression');
app.use(compression()); */

// app config
app.set('view engine', 'pug');
app.set('views', ['./apps/list/views', './apps/article/views']);

/* 爬虫日志记录 */
app.use(function(req, res, next){
	spiderLog(req);
	next();
});

// public static file
var options = {
	maxAge: '1d'
}
app.use('/static', express.static('static', options));
app.use('/static1', express.static(path.resolve(__dirname, '../front/dist'), options));

// 图片资源
app.use('/img', express.static('../images'));

// routers
/* 文章列表 */
app.use('/list', require('./apps/list/router'));
/* 文章详情 */
app.use('/article', require('./apps/article/router'));
/* 数据接口 */
app.use('/apis', require('./apis/router'));

// 重定向到首页
app.use('/', require('./apps/list/router'));

/* 缓存加载 */
var cacheCont = require('./apps/cache/cacheContainer');
/* 缓存刷新 */
var cacheFresh = require('./apps/schedule/cache'),
	fetch = require('./apps/schedule/fetch');


cacheCont.init()
.then(function(){
	var server = app.listen(config.httpServerPort, function () {
		debug(chalk.grey('http服务已启动 端口：'), chalk.yellow(config.httpServerPort));

		return Promise.resolve()
	});
})
.then(function() {
	cacheFresh.start();
	fetch.start();
})

