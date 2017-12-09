var express = require('express');
var router = express.Router();
var config = require('../apps/config');

/* 跨域配置 */
router.use(function (req, res, next) {
    if (config.cros['Access-Control-Allow-Origin'].indexOf(req.headers.origin) !== -1) {
        res.append('Access-Control-Allow-Origin', req.headers.origin);
    }
    
    res.append('Access-Control-Allow-Methods', config.cros['Access-Control-Allow-Methods']);
    next();
});

/* 数据统计 */
router.use('/sta', require('./sta/router'));
/* 404 */
router.use('/', function (req, res) {
    res.sendStatus(404);
})



module.exports = router;