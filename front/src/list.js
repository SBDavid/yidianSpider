require('jquery-lazyload');
var config = require('../../httpServer/apps/config');
$("img[data-original]").lazyload({
    failurelimit : 10,
    placeholder: config.getUrl('static') + '/list/static/css/lazyload.svg'
});