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
        return arguments[0].format(format);
    };
}

function dateUtil() {
    this.now = moment();
}



dateUtil.prototype.timeFromNowYidian = createTimeFromNow(yidianFormat);

dateUtil.prototype.getMomentYidian = createMoment(yidianFormat);

dateUtil.prototype.getNormalFormatDate = createFormatDate(normalDateFormat);

module.exports = dateUtil;