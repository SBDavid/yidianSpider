var express = require('express');
var router = express.Router();

/* 数据统计 */
router.use('/sta', require('./sta/router'));
/* 404 */
router.use('/', function(req, res) {
    res.sendStatus(404);
})



module.exports = router;