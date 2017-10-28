var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://SBDavid:mvbnmv9787302@127.0.0.1:27017/yidian', {
    useMongoClient: true,
});

module.exports = mongoose;