var debug = require('debug')('fetchArticle:persistence');
var chalk = require('chalk');

var importArticleTask =  require('./importArticle');
var importPicturesTask =  require('./importPictures');

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
    }
};

module.exports = function(cmdName, args) {
    return cmds[cmdName].apply(this, args);
}