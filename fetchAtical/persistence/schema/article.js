var mongoose = require('../connection');

var articleSchema = mongoose.Schema({
    date: { type: String },
    meta: { type: String },
    docid: { type: String },
    title: { type: String },
    ctype: { type: String },
    dtype: { type: Number },
    impid: { type: String },
    pageid: { type: String },
    itemid: { type: String },
    channel_id: { type: String },
    display_flag: { type: Number },
    feedback_forbidden: { type: Boolean },
    tags: [],
    summary: { type: String },
    image_urls: [],
    source: { type: String },
    url: { type: String },
    category: { type: String },
    image: { type: String },
    comment_count: { type: Number },
    up: { type: Number },
    like: { type: Number },
    auth: { type: Boolean },
    is_gov: { type: Boolean },
    content_type: { type: String },
    b_political: { type: Boolean },
    title_sn: { type: Number },
    wemedia_info: { type: Object },
});

module.exports = mongoose.model('article', articleSchema);