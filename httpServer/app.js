var debug = require('debug')('httpServer:app');
var chalk = require('chalk');

var express = require('express');
var app = express();

// app config
app.set('view engine', 'pug');
app.set('views', ['./apps/list/views']);

// public static file
app.use('/static', express.static('static'));

// 图片资源
app.use('/img', express.static('../images'));

// routers
app.use('/', require('./apps/router'));

var server = app.listen(81, function () {
	debug(chalk.grey('http服务已启动 端口：'), chalk.yellow(81));
});