function mySchedule(interval) {
    this.timer = null;
    this.interval = interval || 10 * 60 * 1000;
    this.tasks = new Map();
}

mySchedule.prototype.start = function() {
    var self = this;
    if (self.tasks.lenght === 0) {
        return;
    }
    this.timer = setInterval(function(){
        self.tasks.forEach(function(val, key){
            val.callBack.call(val.context);
        });
    }, this.interval);
}

mySchedule.prototype.stop = function() {
    if (this.timer === null) return;
    clearInterval(this.timer);
}

mySchedule.prototype.addTask = function(taskName, callBack, context) {
    this.tasks.set(taskName, {
        callBack: callBack,
        context: context
    });
}

module.exports = mySchedule;