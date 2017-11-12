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
        loader()
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

/* 初始化或则刷新缓存 */
cacheContainer.prototype.init = async function() {
    
    var self = this;
    var loaders = [listLoader.lastestList, listLoader.mostViewedList, lastestArticleLoader];
    try {
        for (var i = 0; i < loaders.length; i++) {
            await self.load(loaders[i]);
        }
    } catch(err) {
        debug(chalk.red('缓存加载失败'), chalk.bgRed(err));
    }
    debug(chalk.grey('缓存加载结束'));
}

var cacheCont = new cacheContainer();

module.exports = cacheCont;
