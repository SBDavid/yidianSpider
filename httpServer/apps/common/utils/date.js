var moment = require('moment');

var yidianFormat = 'YYYY-MM-DD HH:mm:ss';

var normalDateFormat = 'YYYY-MM-DD';

createMoment = function (format) {
    return function () {
        return moment(arguments[0], format);
    };
}

createTimeFromNow = function (format) {
    return function () {
        var dateEnd = this.now;
        var dateStart = moment(arguments[0], format);

        return {
            minutes: dateEnd.diff(dateStart, 'minutes'),
            hours: dateEnd.diff(dateStart, 'hours'),
            days: dateEnd.diff(dateStart, 'days')
        }
    };
}

createFormatDate = function (format) {
    return function () {
        console.info(1, arguments);
        var t = arguments[0].format(format);
        console.info(2);
        return t;
    };
}

function dateUtil() {
    this.now = moment();
}



dateUtil.prototype.timeFromNowYidian = createTimeFromNow(yidianFormat);

dateUtil.prototype.getMomentYidian = createMoment(yidianFormat);

dateUtil.prototype.getNormalFormatDate = createFormatDate(normalDateFormat);

module.exports = dateUtil;