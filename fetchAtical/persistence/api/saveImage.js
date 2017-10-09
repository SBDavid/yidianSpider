var base64 = require('../../utils/node-base64-image');

function saveImage(imageData) {
    var opt = {
        filename: imageData.filename
    }
    var image = new Buffer(imageData.image, 'binary');

    return new Promise(function(resolve, reject) {
        base64.decode(image, opt, (err, response) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
}

module.exports = saveImage;
