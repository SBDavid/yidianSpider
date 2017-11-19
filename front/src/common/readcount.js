/* 文章打开次数统计 */

require('whatwg-fetch');

var config = require('../../../httpServer/apps/config');

const pathName = window.location.pathname;

var itemid = pathName.match(/\/article\/([A-Za-z0-9]+)/);

if (itemid && itemid[1]) {
    itemid = itemid[1];
}

fetch(config.getUrl('api') + '/apis/sta/readcount/' + itemid)
.then(function(data) {
   
})
.catch(function(err){
    console.error("文章书统计错误：", err)
})