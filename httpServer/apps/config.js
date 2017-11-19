var domain = {
    dev: {
        website: {
            domain: 'localhost',
            host: '81'
        },
        static: {
            domain: 'localhost',
            host: '81'
        },
        img: {
            domain: 'localhost',
            host: '81'
        },
        api: {
            domain: 'localhost',
            host: '81'
        },
        contentStratege: 'outter'
    },
    pro: {
        website: {
            domain: 'm.xishuashua.site',
            host: '80'
        },
        static: {
            domain: 'm.xishuashua.site',
            host: '80'
        },
        img: {
            domain: 'm.xishuashua.site',
            host: '80'
        },
        api: {
            domain: 'm.xishuashua.site',
            host: '80'
        },
        contentStratege: 'outter'
    },
    beian: {
        website: {
            domain: '101.132.147.139',
            host: '80'
        },
        static: {
            domain: '101.132.147.139',
            host: '80'
        },
        img: {
            domain: '101.132.147.139',
            host: '80'
        },
        api: {
            domain: '101.132.147.139',
            host: '80'
        },
        contentStratege: 'outter'
    }
};

function config() {
    this.env = process.env.env || 'dev';
    this.domain = domain[this.env];
    this.port = domain[this.env].website.host;
    this.contentStratege = domain[this.env].contentStratege;
}

config.prototype.getUrl = function(type) {
    return 'http://' + domain[this.env][type].domain + ':' + domain[this.env][type].host;
}

module.exports = new config();