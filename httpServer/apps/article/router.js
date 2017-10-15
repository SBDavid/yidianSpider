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
    }
}));

//static file
router.use('/static', express.static(__dirname + '/static'));

router.get('/:itemid', function (req, res) {
    controller(req.params.itemid)
    .then(function(articles){
        res.render('article', {
            config: config,
            article: articles[0]
        });
    })
});



module.exports = router;