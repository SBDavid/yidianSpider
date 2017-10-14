module.exports = {
    domain: {
        website: {
            domain: 'www.xwm.com',
            host: '80'
        },
        static: {
            domain: 'static.xwm.com',
            host: '80'
        },
        img: {
            domain: 'img.xwm.com',
            host: '80'
        }
    },
    getDomain: function(type) {
        return 'http://' + this.domain[type].domain + ':' + this.domain[type].host;
    }
}