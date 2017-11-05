var debug = require('debug')('httpServer:app');
var chalk = require('chalk');

var express = require('express');
var app = express();

var config = require('./apps/config');

// gzip
var compression = require('compression');
app.use(compression());

// app config
app.set('view engine', 'pug');
app.set('views', ['./apps/list/views', './apps/article/views']);

// public static file
app.use('/static', express.static('static'));

// 图片资源
app.use('/img', express.static('../images'));

// routers
app.use('/', require('./apps/list/router'));
app.use('/list', require('./apps/list/router'));
app.use('/article', require('./apps/article/router'));

// 重定向到首页
/* app.use('/', function (req, res){
	res.redirect('/list');
}); */

/* 缓存加载 */
var cacheCont = require('./apps/cache/cacheContainer');
cacheCont.init()
.then(function(){
	var server = app.listen(config.port, function () {
		debug(chalk.grey('http服务已启动 端口：'), chalk.yellow(config.port));
	});
})

