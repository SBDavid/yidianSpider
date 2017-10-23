/**
 * 批量获取文章链接并保存文章中的图片链接
 */
var debug = require('debug')('fetchArticle:task');
var chalk = require('chalk');

var articleApi = require('./persistence/api/article');
var getAticle = require('./httpClient/getArticle');

var getImage = require('./httpClient/getImage');
var saveImage = require('./persistence/api/saveImage');

/**
 * 获取图片二进制数据，并保存图片
 * @param {Object} image 
 */
function saveImageFile(imageUrl, isSurface, isStatic) {
    return new Promise(function (resolve, reject) {

        var filename;

        getImage(imageUrl)
            .then(function (imageData) {
                filename = imageData.filename
                if (isSurface) {
                    imageData.filename = '../images/surface/' + imageData.filename;
                } else if (isStatic) {
                    imageData.filename = '../images/static/' + imageData.filename;
                } else {
                    imageData.filename = '../images/content/' + imageData.filename;
                }
                return saveImage(imageData);
            })
            .then(function (res) {
                resolve(filename);
            })
            .catch(function (err) {
                reject(err);
            })
    });
}

function importPictureFromArticle(article, timeout) {
    return new Promise(function (resolve, reject) {
        var imageList;
        // 获取图片链接
        getAticle(article.itemid)
            .then(function (images) {
                // 保存图片信息
                imageList = {
                    content: images,
                    surface: []
                };
                // 保存图片文件 surface
                var savePromises = [];
                images.forEach((image, index) => {
                    if (index < 3) {
                        imageList.surface.push({
                            width: 320,
                            height: 240,
                            animated: false,
                            url: image.url + '&type=thumbnail_320x200'
                        })
                        savePromises.push(saveImageFile(image.url + '&type=thumbnail_320x200', true, false));
                    }
                })

                return Promise.all(savePromises);
            })
            /* 保存文件名 surface */
            .then(function (filenames) {
                filenames.forEach((filename, index) => {
                    imageList.surface[index].filename = filename;
                });
                return Promise.resolve(true); // 这一步没有异步请求
            })
            /* 保存图片文件 content */
            .then(function () {
                var savePromises = [];
                imageList.content.forEach((image) => {
                    savePromises.push(saveImageFile(image.url, false));
                })

                return Promise.all(savePromises);
            })
            /* 保存文件名 content */
            .then(function (filenames) {
                filenames.forEach((filename, index) => {
                    imageList.content[index].filename = filename;
                });
                return Promise.resolve(filenames); // 这一步没有异步请求
            })
            .then(function (res) {
                debug(chalk.grey('单篇文章图片文件保存成功 图片数量：'), chalk.yellow(res.length));
                // 保存图片链接
                return articleApi.update({ itemid: article.itemid }, { images: imageList });
            })
            /* 保存图片文件 静态图 */
            .then(function () {
                var savePromises = [];
                var gifs = imageList.content.filter(img => { return img.animated === true });
                gifs.forEach(gif => {
                    savePromises.push(saveImageFile(`${gif.url}&type=thumbnail_${gif.width}x${gif.height}`, false, true));
                });
                return Promise.all(savePromises);
            })
            .then(function (res) {
                debug(chalk.grey('静态图保存成功 图片数量：'), chalk.yellow(res.length));
            })
            .then(function (res) {
                setTimeout(function () {
                    resolve(res);
                }, timeout);
            })
            .catch(function (err) {
                debug(chalk.red('单篇文章图片导入失败'), chalk.bgRed(err));
                setTimeout(function () {
                    reject(err);
                }, timeout);
            })
    });
}

async function importLoop(articles, timeout) {
    var result = 0;

    try {
        for (var i = 0; i < articles.length; i++) {
            result += await importPictureFromArticle(articles[i], timeout);
            debug(chalk.grey('进度：'), chalk.yellow(i + '/' + articles.length));
        }
    }
    catch (err) {
        return Promise.reject(err);
    }

    return Promise.resolve(result);
}

/**
 * 批量获取文章链接并保存文章中的图片链接
 * 查询前n个未扒取的文章
 * 最后返回更新的数量
 */
function importPictures(amount, timeout) {
    amount = parseInt(amount);
    timeout = parseInt(timeout);
    return new Promise(function (resolve, reject) {

        articleApi.find({ images: null }, amount)
            .then(function (articles) {
                debug(chalk.grey('查询到未扒取文章数量：'), chalk.yellow(articles.length));
                return importLoop(articles, timeout);
            })
            .then(function (amout) {
                debug(chalk.grey('文章的中的图片已更新 文章数量：'), chalk.yellow(amout));
            })
            .catch(function (err) {
                debug(chalk.red('导入文章中的图片链接失败'), chalk.red(err));
                reject(err);
            })
    });
}

module.exports = importPictures;