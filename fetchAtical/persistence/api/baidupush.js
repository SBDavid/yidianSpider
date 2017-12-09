var utils = require('./utils');
var baidupushModel = require('../schema/baidupush');


function baidupushApi() {

}

baidupushApi.prototype = {
    insert: function(obj) {
        var newObj = new baidupushModel(obj);
        return utils.insert(newObj, 'baidupush');
    }
}

module.exports = new baidupushApi();