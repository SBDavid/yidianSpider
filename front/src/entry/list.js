require('jquery-lazyload');

var utils = require('../common/utils');

$("img[data-original]").lazyload({
    failurelimit : 10,
    placeholder: STATIC_URL + '/list/static/css/lazyload.svg'
});

function getElementPosition(element) {
    var rect = element.getBoundingClientRect();

    return {
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom
    };
}

function addSticky () {
    var headerBottom = getElementPosition($('.header')[0]).bottom;
    if (headerBottom <= 0) {
        $('.cateloge-container').addClass('sticky');
    } else {
        $('.cateloge-container').removeClass('sticky');
    }
}

$(window).scroll(utils.debounce(addSticky, 100));