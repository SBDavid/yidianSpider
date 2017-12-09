var mongoose = require('../connection');

var baidupushSchema = mongoose.Schema({
    url: { type: String },
    action: { type: String },
    isDone: { type: String, default: false }
}, { 
    autoIndex: false,
    _id: true,
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('baidupush', baidupushSchema);