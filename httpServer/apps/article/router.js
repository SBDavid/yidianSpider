var express = require('express');
var router = express.Router();
var lessMiddleware = require('less-middleware');

var config = require('../config');
var controller = require('./controller/controller');

router.use('/static/css', lessMiddleware(__dirname + '/static/less', {
    dest: __dirname + '/static/css',
    force: false,
    debug: false,
    render: {
        compress: false
    }
}));

//static file
var options = {
	maxAge: '1d'
}
router.use('/static', express.static(__dirname + '/static', options));

router.get('/:itemid', function (req, res) {
    controller(req.params.itemid, req.query.cateloge)
    .then(function(article){
        res.render('article', {
            domain: config.domain,
            title: '嘻唰唰 ' + article.title,
            keywords: '搞笑图片 嘻唰唰 ' + article.title,
            description: article.title,
            article: article
        });
    })
});



module.exports = router;