var express = require('express');
var router = express.Router();
var lessMiddleware = require('less-middleware');


router.use('/list/static/css', lessMiddleware('apps/list/static/less', {
    dest: 'apps/list/static/css',
    force: true,
    debug: false,
}));

//static file
router.use('/list/static', express.static('apps/list/static'));

router.get('/list', function (req, res) {
    setTimeout(function(){
        res.render('list', { 
            title: "小黄毛",
            articles: [{
                title: '1'
            }, {
                title: '2'
            }]
        });
    }, 10)

});



module.exports = router;