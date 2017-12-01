var express = require('express');
var router = express.Router();
var lessMiddleware = require('less-middleware');

var controller = require('./controller/controller');

var lessM  = lessMiddleware(__dirname + '/static/less', {
    dest: __dirname + '/static/css',
    force: false,
    debug: false,
    render: {
        compress: false
    },
});

router.use('/static/css', lessM);
router.use('list/static/css', lessM);

//static file
var options = {
	maxAge: '1d'
}
router.use('/static', express.static(__dirname + '/static', options));
router.use('list/static', express.static(__dirname + '/static', options));

function getList(req, res, listType) {
    // 获取文章列表 -- 已经扒取成功的
    controller(listType)
    .then(function(data){
        res.render('list', data);
    })
}

router.get('/', function(req, res) {
    getList(req, res, 'lastestList');
});
router.get('list/', function(req, res) {
    getList(req, res, 'lastestList');
});

router.get('/:listType', function (req, res) {
    getList(req, res, req.params.listType);
});
router.get('list/:listType', function (req, res) {
    getList(req, res, req.params.listType);
});

module.exports = router;