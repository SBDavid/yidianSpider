var domain = {
    dev: {
        website: {
            domain: 'xwm.com',
            host: '81'
        },
        static: {
            domain: 'static.xwm.com',
            host: '81'
        },
        img: {
            domain: 'img.xwm.com',
            host: '81'
        }
    },
    pro: {
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
        }
    }
};

function config() {
    this.env = process.env.env || 'dev';
    this.domain = domain[this.env];
    this.port = domain[this.env].website.host
}

config.prototype.getUrl = function(type) {
    return 'http://' + domain[this.env][type].domain + ':' + domain[this.env][type].host;
}

module.exports = new config();