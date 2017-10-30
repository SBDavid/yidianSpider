require('jquery-lazyload');
$("img[data-original]").lazyload({
    failurelimit : 10,
    src: 'data-original'
});