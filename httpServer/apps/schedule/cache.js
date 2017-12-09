var mySchedule = require('./mySchedule'),
    cacheCont = require('../cache/cacheContainer');

function cache() {
    this.s = new mySchedule(100 * 1000 * 60);
    this.s.addTask('refresh', cacheCont.init, cacheCont);
}

cache.prototype.start= function() {
    this.s.start();
}

module.exports = new cache();