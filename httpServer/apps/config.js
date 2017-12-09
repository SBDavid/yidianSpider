var domain = {
    dev: {
        website: {
            domain: 'localhost',
            host: '80'
        },
        static: {
            domain: 'localhost',
            host: '80'
        },
        img: {
            domain: 'localhost',
            host: '80'
        },
        api: {
            domain: 'localhost',
            host: '80'
        },
        sta: {
            domain: 'sta.local.com',
            host: '80'
        },
        contentStratege: 'outter',
        httpServerPort: 80,
        cros: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET'
        }
    },
    pro: {
        website: {
            domain: 'm.xishuashua.site',
            host: '80'
        },
        static: {
            domain: 'static.xishuashua.site',
            host: '80'
        },
        img: {
            domain: 'img.xishuashua.site',
            host: '80'
        },
        api: {
            domain: 'api.xishuashua.site',
            host: '80'
        },
        sta: {
            domain: 'sta.xishuashua.site',
            host: '80'
        },
        contentStratege: 'outter',
        httpServerPort: 8001,
        cros: {
            'Access-Control-Allow-Origin': '*.xishuashua.site',
            'Access-Control-Allow-Methods': 'POST, GET'
        }
    }
};

function config() {
    this.env = process.env.env || NODE_ENV || 'dev';
    this.domain = domain[this.env];
    this.httpServerPort = domain[this.env].httpServerPort;
    this.contentStratege = domain[this.env].contentStratege;
    this.cros = domain[this.env].cros;
}

config.prototype.getUrl = function(type) {
    return 'http://' + domain[this.env][type].domain + ':' + domain[this.env][type].host;
}

module.exports = new config();