var debug = require('debug')('fetchArticle:persistence');
var chalk = require('chalk');
module.exports = {
    insert: function(obj, objName) {
        return new Promise(function(resolve, reject) {
            obj.save(function(err, _obj){
                if (err) {
                    debug(chalk.red(`${objName}保存失败 ${objName}:`), chalk.red(_obj), chalk.red(err));
                    reject(err);
                } else {
                    resolve(_obj);
                }
            });
        });
    }
}