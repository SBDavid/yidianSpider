var debug = require('debug')('httpServer:controller');
var chalk = require('chalk');

var cacheCont = require('../../cache/cacheContainer');
var config = require('../../config');

/* 根据不同的cateloge附加不同url */
function addUrl(articles, cateloge) {
    return articles.map(function(article) {
        article.url = config.getUrl('website') + "/article/"+article.itemid+"?cateloge="+cateloge
        return article;
    })
}

function getList(listType) {
    return new Promise(function(resolve, reject) {
        var articles = cacheCont.get(listType, {
            start: 0,
            end: 30
        }).data;

        resolve(addUrl(articles, listType));
    });
}

module.exports = function(listType) {
    return new Promise(function(resolve, reject) {
        getList(listType)
        .then(function(articles) {
            resolve(
                {
                    domain: config.domain,
                    title: "嘻唰唰 搞笑图片",
                    keywords: "搞笑图片 搞笑 gif 搞笑动图",
                    description: '搞笑gif图片，每日刷新',
                    articles: articles,
                    cateloge: {
                        cateloges: [
                            {
                                title: '最 新',
                                url: config.getUrl('website') + '/list/lastestList',
                                isCurrent: 'lastestList' === listType
                            },
                            {
                                title: '热 门',
                                url: config.getUrl('website') + '/list/mostViewedList',
                                isCurrent: 'mostViewedList' === listType
                            }
                        ]
                    }
                }
            );
        }) 
    });
}