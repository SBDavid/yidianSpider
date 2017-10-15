module.exports = {
    domain: {
        website: {
            domain: 'w185896w27.imwork.net',
            host: '80'
        },
        static: {
            domain: 'w185896w27.imwork.net',
            host: '80'
        },
        img: {
            domain: 'w185896w27.imwork.net',
            host: '80'
        }
    },
    getDomain: function(type) {
        return 'http://' + this.domain[type].domain + ':' + this.domain[type].host;
    }
}