var spiderlogApi = require('../../../fetchAtical/persistence/api/spiderlog');

uaMap = {
    'Mozilla/5.0 (Linux;u;Android 4.2.2;zh-cn;) AppleWebKit/534.46 (KHTML,likeGecko) Version/5.1 Mobile Safari/10600.6.3 (compatible; Baiduspider/2.0;+http://www.baidu.com/ search/ spider.html)': {
        tag: '移动UA 1',
        spiderName: 'baidu'
    },
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 likeMac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143Safari/601.1 (compatible; Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)': {
        tag: '移动UA 2',
        spiderName: 'baidu'
    },
    'Mozilla/5.0 (compatible; Baiduspider/2.0;+http://www.baidu.com/search/spider.html)': {
        tag: 'PC UA 1',
        spiderName: 'baidu'
    },
    'Mozilla/5.0(compatible;Baiduspider-render/2.0;+http://www.baidu.com/search/ spider.html)': {
        tag: 'PC UA 2',
        spiderName: 'baidu'
    }
}

function spiderlog(req) {
    var ua = req.headers['user-agent'];

    // 只需要m.xishuashua.com www.xishuashua.site

    var logItem = {
        spiderName: (uaMap[ua] && uaMap[ua].spiderName) || 'other',
        tag: (uaMap[ua] && uaMap[ua].tag) || 'other',
        hostname: req.hostname,
        originalUrl: req.originalUrl,
        path: req.path,
        query: req.query,
        ua: ua
    }

    spiderlogApi.insert(logItem);
}

module.exports = spiderlog;