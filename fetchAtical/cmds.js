var debug = require('debug')('fetchArticle:persistence');
var chalk = require('chalk');

// 获取参数
var cmdName = process.argv.slice(2,3)[0];
var args = process.argv.slice(3);
debug(chalk.grey('命令名：'), chalk.yellow(cmdName), chalk.grey('参数：'), chalk.yellow(args));

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
        importArticleTask.apply(this, arguments)
        .then(function() {
            debug(chalk.gray('执行结束'));
            process.exit(0)
        })
    },
    importPictures: function() {
        importPicturesTask.apply(this, arguments)
        .then(function() {
            debug(chalk.gray('执行结束'));
            process.exit(0)
        })
    }
};

function runCmd(cmdName, args) {
    cmds[cmdName].apply(this, args)
}

runCmd(cmdName, args);