var debug = require('debug')('fetchArticle:persistence');
var chalk = require('chalk');

var importArticleTask =  require('./importArticle');
var importPicturesTask =  require('./importPictures');
var baiduUploadPage = require('../httpServer/apps/spiderlog/baiduUploadPage');

cmds = {
    /* 
        m5565 
        m203647 
        m75544 它趣 
        m577717 青哇
    */
    importArticle: function() {
        var self = this,
            args = arguments;
        
        return new Promise(function(resolve, reject) {
            importArticleTask.apply(self, args)
            .then(function() {
                debug(chalk.gray('执行结束'));
                resolve('ok');
            })
            .catch(function(err){
                reject(err);
            });
        });
        
    },
    importPictures: function() {
        var self = this,
            args = arguments;

        return new Promise(function(resolve, reject) {
            importPicturesTask.apply(self, args)
            .then(function() {
                debug(chalk.gray('执行结束'));
                resolve('ok');
            })
            .catch(function(err){
                reject(err);
            });
        });
    },
    baiduUploadPage: function() {
        var self = this,
        args = arguments;

        return new Promise(function(resolve, reject) {
            baiduUploadPage()
            .then(function(res) {
                debug(chalk.gray('执行结束'), chalk.yellow(res));
            })
            .catch(function(err){
                debug(chalk.red('baiduUploadPage'), chalk.red(err));
                reject(err);
            });
        })
    }
};

module.exports = function(cmdName, args) {
    return cmds[cmdName].apply(this, args);
}