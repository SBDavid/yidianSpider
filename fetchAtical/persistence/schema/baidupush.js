var mongoose = require('../connection');

var baidupushSchema = mongoose.Schema({
    url: { type: String },
    action: { type: String },
    amount: { type: Number },
    isDone: { type: Boolean, default: false },
    result: { type: Object, default: null }
}, { 
    autoIndex: false,
    _id: true,
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('baidupush', baidupushSchema);