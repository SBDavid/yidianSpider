var spiderlogModel = require('../schema/spiderlog');
var debug = require('debug')('spiderlog:persistence');
var chalk = require('chalk');
function spiderlogApi() {

}

spiderlogApi.prototype = {
    insert: function(obj) {
        return new Promise(function(resolve, reject) {
            var newObj = new spiderlogModel(obj);
            newObj.save(function(err, obj){
                if (err) {
                    debug(chalk.red('spiderlog保存失败 spiderlog:'), chalk.red(obj), chalk.red(err));
                    reject(err);
                } else {
                    resolve(obj);
                }
            });
        });
    }
}

module.exports = new spiderlogApi();