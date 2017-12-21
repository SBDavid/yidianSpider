var fetch = require('node-fetch'),
    baidupushApi = require('../../../fetchAtical/persistence/api/baidupush');

function upload(items) {

    const apis = {
        insert: 'http://data.zz.baidu.com/urls?site=m.xishuashua.site&token=CA3Z8HzriWxmojz3',
        update: ' http://data.zz.baidu.com/update?site=m.xishuashua.site&token=CA3Z8HzriWxmojz3'
    }

    return new Promise(function(resolve, reject) {
        var prom = [];
        items.forEach(function(element) {
            prom.push(fetch(apis[element.action],
                { method: 'POST', body: element.url}
            ));
            
        });

        Promise.all(prom)
        .then(function(res) {
            var prom2 = [];
            res.forEach(function(element) {
                prom2.push(element.json());
            })

            return Promise.all(prom2);
        })
        .then(function(res) {
            var result = [];
            items.forEach(function(val, idx) {
                result.push({
                    _id: val._id,
                    result: res[idx]
                });
            })

            resolve(result);
        })
    })
}

function baiduUploadPage() {
    return new Promise(function(resolve, reject) {
        baidupushApi.find({isDone : false}, 10, {'createdAt': -1})
        .then(function(items) {
            if (items.length === 0) {
                resolve(0);
                return;
            } else {
                // 百度提交
                return upload(items);
            }
        })
        // 保存结果
        .then(function(res) {
            var prom = [];
            res.forEach(function(element) {
                prom.push(baidupushApi.update({_id: element._id}, {
                    result: element.result,
                    isDone: true
                }))
            })
            return Promise.all(prom);
        })
        .then(function(res) {
            var updateAmount = res.filter(function(ele) {
                return ele >= 1;
            })
            resolve(updateAmount);
        })
        .catch(function(err) {
            reject(err);
        }) 
    })
}
baiduUploadPage();
module.exports = baiduUploadPage;