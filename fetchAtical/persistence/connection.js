var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/yidian', {
    useMongoClient: true,
});

module.exports = mongoose;