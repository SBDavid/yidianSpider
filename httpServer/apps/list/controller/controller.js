var debug = require('debug')('httpServer:controller');
var chalk = require('chalk');

var cacheCont = require('../../cache/cacheContainer');
module.exports = function() {
    return new Promise(function(resolve, reject) {
        resolve(cacheCont.get('lastestList', {
            start: 0,
            end: 30
        }).data);
    });
}