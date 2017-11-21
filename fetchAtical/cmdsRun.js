var debug = require('debug')('fetchArticle:persistence');
var chalk = require('chalk');

// 获取参数
var cmdName = process.argv.slice(2,3)[0];
var args = process.argv.slice(3);
debug(chalk.grey('命令名：'), chalk.yellow(cmdName), chalk.grey('参数：'), chalk.yellow(args));

var cmds = require('./cmds');

function runCmd(cmdName, args) {
    cmds(cmdName, args)
    .then(function() {
        process.exit(0);
    })
}

runCmd(cmdName, args);