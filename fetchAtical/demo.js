/* var importArticle =  require('./importArticle');

importArticle('m5565', 100).then(function(res) {
}); */

/* var getArticle = require('./httpClient/getArticle');

getArticle('0HP6j17V').then(function(res){
    console.info(res);
}) */

/*  var articleApi = require('./persistence/api/article');

articleApi.find({}, 1)
.then(function(res) {
    console.info(res);
});  */

var importPictures =  require('./importPictures');

importPictures(100, 10000).then(function(res) {
});
