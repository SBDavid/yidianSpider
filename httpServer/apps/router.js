var express = require('express');
var router = express.Router();
var lessMiddleware = require('less-middleware');

var controller = require('./list/controller/controller');

router.use('/list/static/css', lessMiddleware('apps/list/static/less', {
    dest: 'apps/list/static/css',
    force: true,
    debug: false,
    render: {
        compress: false
    }
}));

//static file
router.use('/list/static', express.static('apps/list/static'));

router.get('/list', function (req, res) {

    // 获取文章列表 -- 已经扒取成功的
    controller()
    .then(function(articles){
        res.render('list', { 
            title: "小黄毛",
            articles: articles
        });
    })
});



module.exports = router;