/* 缓存容器 */
var debug = require('debug')('httpServer:cache');
var chalk = require('chalk');

var lastestListLoader = new require('./lastestListLoader');

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

cacheContainer.prototype.get = function(cacheName, start, end) {
    if (this.cache.cacheName) {
        return {
            data: [],
            total: 0
        }
    } else {
        return {
            data: this.cache[cacheName].slice(start, end),
            total: this.cache[cacheName].length
        }
    }
}

cacheContainer.prototype.init = function() {
    var self = this;

    var loaders = [self.load(lastestListLoader)];

    return new Promise(function(resolve, reject) {
        Promise.all(loaders)
        .then(function(){
            debug(chalk.grey('缓存加载结束'));
            resolve(true);
        }, function(err){
            debug(chalk.red('缓存加载失败'), chalk.bgRed(err));
            reject(err);
        })
    });
}

var cacheCont = new cacheContainer();

module.exports = cacheCont;
