var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://SBDavid:mvbnmv9787302@101.132.147.139:27017/yidian', {
    useMongoClient: true,
});

module.exports = mongoose;