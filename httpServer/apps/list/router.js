var express = require('express');
var router = express.Router();
var lessMiddleware = require('less-middleware');

var config = require('../config');
var controller = require('./controller/controller');

router.use('/static/css', lessMiddleware(__dirname + '/static/less', {
    dest: __dirname + '/static/css',
    force: true,
    debug: false,
    render: {
        compress: false
    },
/*     postprocess: {
        css: function(css, req) {
            console.info(css)
            return css; 
        }
    } */
}));

//static file
router.use('/static', express.static(__dirname + '/static'));

router.get('/', function (req, res) {

    // 获取文章列表 -- 已经扒取成功的
    controller()
    .then(function(articles){
        res.render('list', {
            domain: config.domain,
            title: "嘻唰唰 搞笑图片",
            keywords: "搞笑图片 搞笑 gif 搞笑动图",
            description: '搞笑gif图片，每日刷新',
            articles: articles
        });
    })
});



module.exports = router;