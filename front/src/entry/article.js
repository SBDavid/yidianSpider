var gifContainer = $('.body');

require('../common/readcount');

require('jquery-lazyload');
$("img[data-original]").lazyload({
    failurelimit : 10,
    placeholder: STATIC_URL + '/list/static/css/lazyload.svg'
});

function openGif(currentTarget) {
    var animatedCont = $(currentTarget).parent('.animatedCont');

    // 已经加载
    if (animatedCont.attr('gifloaded') === '1') {
        return;
    }

    // 关闭其他图片的动画
    $(gifContainer).find('.animatedCont[gifloaded=1]').each(function(item){
        $(this).find('img').attr('src', $(this).find('img')[0].dataset.staticSrc);
        $(this).find('.play-btn').show();
        $(this).attr('gifloaded', 0);
    })

    // 启动加载
    animatedCont.find('img').eq(0).attr('src', animatedCont.find('img')[0].dataset.animatedSrc);
    animatedCont.find('.play-btn').hide();
    animatedCont.attr('gifloaded', 1);
}

// 点击图片后加载gif
gifContainer.on('click', 'img', function (event) {
    if ($(event.currentTarget)[0].dataset['animatedSrc'] === undefined) return;
    openGif(event.currentTarget);
});
// 点击按钮后加载gif
gifContainer.on('touchend', '.play-btn', function (event) {
    $(event.currentTarget).prev().attr('src', $(event.currentTarget).prev()[0].dataset['animatedSrc']);
    openGif(event.currentTarget);
})
