/* 缓存容器 */
var debug = require('debug')('httpServer:cache');
var chalk = require('chalk');

var listLoader = new require('./listLoader'),
    lastestArticleLoader = new require('./lastestArticleLoader');

var cacheContainer = function() {
    this.cache = {};
}

cacheContainer.prototype.load = function(loader) {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        loader.loader()
        .then(function(data){
            self.cache[loader.loaderName] = data;
            debug(chalk.grey('缓存加载成功'), chalk.yellow(loader.loaderName), chalk.yellow('数量：'), chalk.yellow(data.length));
            resolve(true);
        })
        .catch(function(err) {
            debug(chalk.red('缓存加载失败'),chalk.red(loader.loaderName), chalk.bgRed(err));
            reject(err);
        });
    })
}

cacheContainer.prototype.get = function(cacheName, opt) {
    opt = Object.assign({
        start: 0,
        end: 100,
        filter: function(item) {
            return true;
        }
    }, opt)
    if (this.cache[cacheName] === undefined) {
        return {
            data: [],
            total: 0
        }
    } else {
        return {
            data: this.cache[cacheName].slice(opt.start, opt.end).filter(opt.filter),
            total: this.cache[cacheName].length
        }
    }
}

/* 异步方式获取缓存，如果缓存中没有则从数据库加载 */
cacheContainer.prototype.getAsync = function(cacheName, opt) {
    var self = this;
    var cacheData = this.get(cacheName, opt);
    if (cacheData.data.length > 0) {
        return Promise.resolve(cacheData);
    }
    return new Promise(function(resolve, reject) {
        // 查找loader
        var loader = self.loaders.filter(function(item){
            return item.loaderName === cacheName;
        })
        
        // 没有找到loader
        if (loader.length === 0) {
            resolve({
                data: [],
                total: 0
            });
        }
        // 执行二次加载
        loader[0].loaderAdd(opt.condition, opt.amount)
        .then(function(data) {
            if (data.length === 0) {
                resolve({
                    data: [],
                    total: 0
                });
            } else {
                Array.prototype.push.apply(self.cache[cacheName], data);
                resolve(self.get(cacheName, opt));
            }
        })
    });
}

/* 初始化或则刷新缓存 */
cacheContainer.prototype.init = async function() {
    
    var self = this;
    this.loaders = [listLoader.lastestList, listLoader.mostViewedList, lastestArticleLoader];
    try {
        for (var i = 0; i < self.loaders.length; i++) {
            await self.load(self.loaders[i]);
        }
    } catch(err) {
        debug(chalk.red('缓存加载失败'), chalk.bgRed(err));
    }
    debug(chalk.grey('缓存加载结束'));
}

var cacheCont = new cacheContainer();

module.exports = cacheCont;
