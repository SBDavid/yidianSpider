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
                    debug(chalk.red('article保存失败 article:'), chalk.red(obj), chalk.red(err));
                    reject(err);
                } else {
                    debug(chalk.grey('article保存成功 itemid: '), chalk.yellow(obj.itemid));
                    resolve(obj);
                }
            });
        });
    },
    /**
     * 查询article信息
     * @param article Object 查询参数
     * @param limit Number 最大数量, 默认10条
     * @param sort Object 排序, 默认日期倒排
     */
    find: function(article, limit, sort) {
        limit = (limit && limit <= 500) ? limit : 10;
        var query =  artileModel.find(Object.assign({}, article));
        return new Promise(function(resolve, reject) {
            query
            .sort({date: -1 } || sort)
            .limit(limit)
            .slice('images.content',20)
            .exec(function(err, res) {
                if (err) {
                    debug(chalk.red('article查找失败 查询条件:'), chalk.red(article), chalk.red(err));
                    reject(err);
                } else {
                    debug(chalk.grey('article查找成功 数据量: '), chalk.yellow(res.length));
                    resolve(res);
                }
            })
        });
    },
    // 无重复刷新
    save: function(obj) {
        var self = this;
        return new Promise(function(resolve, reject) {
            self.find({itemid: obj.itemid}, 1)
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
    },
    update: function(conditions, doc) {
        return new Promise(function(resolve, reject) {
            artileModel.update(conditions, doc, function(err, raw) {
                if (err) {
                    debug(chalk.red('article更新失败 查询条件:'), chalk.bgRed(conditions), 
                    chalk.red('更新内容:'), chalk.bgRed(doc), chalk.red(err));
                    reject(err);
                } else {
                    debug(chalk.grey('article更新成功 数量：'), chalk.yellow(raw.n));
                    resolve(raw.n);
                }
            })
        });
    }
}
module.exports = new articleApi();