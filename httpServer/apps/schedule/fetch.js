var mySchedule = require('./mySchedule'),
    cmds = require('../../../fetchAtical/cmds'),
    baiduUploadPage = require('../spiderlog/baiduUploadPage');


function cb() {
    cmds('importArticle', ['m5565', 10])
    .then(function() {
        return cmds('importArticle', ['m75544', 10])
    })
    .then(function() {
        return cmds('importArticle', ['m75544', 10])
    })
    .then(function() {
        return cmds('importArticle', ['m577717', 10])
    })
    .then(function() {
        return cmds('importArticle', ['m11101', 10])
    })
    .then(function() {
        return cmds('importArticle', ['m145615', 10])
    })
    .then(function() {
        return cmds('importArticle', ['m91310', 10])
    })
    .then(function() {
        return cmds('importPictures', [30, 30000])
    })
    .then(function() {
        return baiduUploadPage();
    })
}

function fetch() {
    this.s = new mySchedule(1000 * 60 * 60 * 24);
    //this.s = new mySchedule(1000);
    this.s.addTask('refresh', cb, null);
}

fetch.prototype.start= function() {
    this.s.start();
}

module.exports = new fetch();