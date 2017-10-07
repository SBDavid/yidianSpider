var mongoose = require('../connection');

var articleSchema = mongoose.Schema({
    date: { type: String },
    title: { type: String },
    itemid: { type: String },
    source: { type: String },
    fromId: { type: String },
    url: { type: String },
    category: { type: String },
    images: { type: Object, default: null }
}, { 
    autoIndex: false,
    _id: true,
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt '
    }
});

module.exports = mongoose.model('article', articleSchema);