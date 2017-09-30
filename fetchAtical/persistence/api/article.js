var artileModel = require('../schema/article');
var debug = require('debug')('fetchArticle:persistence');
var chalk = require('chalk');

function articleApi() {

}
articleApi.prototype = {
    insert: function(obj) {
        return new Promise(function(resolve, reject) {
            var newObj = new artileModel(obj);
            newObj.save(function(err, obj){
                if (err) {
                    debug(chalk.red('article保存失败 itemid:'), chalk.red(obj.itemid), chalk.red(err));
                    reject(err);
                } else {
                    debug(chalk.grey('article保存成功 itemid: '), chalk.yellow(obj.itemid));
                    resolve(obj);
                }
            });
        });
    },

    find: function(itemid) {
        return new Promise(function(resolve, reject) {
            artileModel.find(itemid ? { itemid: itemid } : null, function(err, obj){
                if (err) {
                    debug(chalk.red('article查找失败 itemid:'), chalk.red(itemid), chalk.red(err));
                    reject(err);
                } else {
                    debug(chalk.grey('article查找成功 数据量: '), chalk.yellow(obj.length));
                    resolve(obj);
                }
            });
        })
    },
    // 无重复刷新
    update: function(obj) {
        var self = this;
        return new Promise(function(resolve, reject) {
            self.find(obj.itemid)
            .then(function(res) {
                if(res.length === 0) {
                    return self.insert(obj);
                } else {
                    // 数据重复
                    resolve(0);
                }
            })
            .then(function(res) {
                resolve(1);
            })
            .catch(function(err) {
                reject(err);
            })
        });
    }
}
module.exports = new articleApi();