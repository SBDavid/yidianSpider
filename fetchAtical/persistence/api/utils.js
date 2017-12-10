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
    },
    update: function(model, conditions, doc, objName) {
        return new Promise(function(resolve, reject) {
            model.update(conditions, doc, function(err, raw) {
                if (err) {
                    debug(chalk.red(`${objName}更新失败 查询条件:`), chalk.bgRed(conditions), 
                    chalk.red('更新内容:'), chalk.bgRed(doc), chalk.red(err));
                    reject(err);
                } else {
                    debug(chalk.grey(`${objName}更新成功 数量：`), chalk.yellow(raw.n));
                    resolve(raw.n);
                }
            })
        });
    },
    find: function(model, article, limit, sort, objName) {
        limit = (limit && limit <= 500) ? limit : 10;
        var query =  model.find(Object.assign({}, article));
        return new Promise(function(resolve, reject) {
            query
            .sort( sort || {createdAt: -1 })
            .limit(limit)
            .exec(function(err, res) {
                if (err) {
                    debug(chalk.red(`${objName}查找失败 查询条件:`), chalk.red(article), chalk.red(err));
                    reject(err);
                } else {
                    debug(chalk.grey(`${objName}查找成功 数据量: `), chalk.yellow(res.length));
                    resolve(res);
                }
            })
        });
    }
}