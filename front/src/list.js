require('jquery-lazyload');

$("img[data-original]").lazyload({
    failurelimit : 10,
    placeholder: STATIC_URL + '/list/static/css/lazyload.svg'
});