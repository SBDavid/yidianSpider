var mongoose = require('../connection');

var spiderlogSchema = mongoose.Schema({
    spiderName: { type: String },
    tag: { type: String },
    hostname: { type: String },
    originalUrl: { type: String },
    path: { type: String },
    query: { type: Object },
    ua: { type: String }
}, { 
    autoIndex: false,
    _id: true,
    timestamps: { 
        createdAt: 'createdAt'
    }
});

module.exports = mongoose.model('spiderlog', spiderlogSchema);