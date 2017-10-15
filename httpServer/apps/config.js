module.exports = {
    domain: {
        website: {
            domain: 'fungif.xishuashua.site',
            host: '80'
        },
        static: {
            domain: 'fungif.xishuashua.site',
            host: '80'
        },
        img: {
            domain: 'fungif.xishuashua.site',
            host: '80'
        }
    },
    getDomain: function(type) {
        return 'http://' + this.domain[type].domain + ':' + this.domain[type].host;
    }
}