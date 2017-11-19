var express = require('express');
var router = express.Router();
var articleApi = require('../../../fetchAtical/persistence/api/article');

router.get('/readcount/:itemid', function (req, res) {
    // 阅读数+1
    articleApi.update({itemid: req.params.itemid}, {$inc: {readCount: 1}})
    .then(function(data) {
        res.sendStatus(200);
    });
});

/* 404 */
router.use('/', function(req, res) {
    res.sendStatus(404);
})

module.exports = router;