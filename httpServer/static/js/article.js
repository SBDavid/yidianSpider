/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var gifContainer = $('.body');

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


/***/ })
/******/ ]);