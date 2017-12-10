var utils = require('./utils');
var baidupushModel = require('../schema/baidupush');


function baidupushApi() {

}

baidupushApi.prototype = {
    insert: function(obj) {
        var newObj = new baidupushModel(obj);
        return utils.insert(newObj, 'baidupush');
    },
    update: function(condition, doc) {
        return utils.update(baidupushModel, condition, doc, 'baidupush');
    },
    find: function(article, limit, sort) {
        return utils.find(baidupushModel, article, limit, sort, 'baidupush');
    }
}

module.exports = new baidupushApi();