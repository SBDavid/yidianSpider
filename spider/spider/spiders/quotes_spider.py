import scrapy

from pymongo import MongoClient

def getArticles():

    client = MongoClient()
    client = MongoClient('localhost', 27017)
    db = client.yidian
    collection = db.articles

    articles = collection.find_one()

    articleLinks = []

    for article in collection.find():
        articleLinks.append("http://www.yidianzixun.com/article/" + article['itemid'])

    return articleLinks


class QuotesSpider(scrapy.Spider):
    name = "quotes"

    custom_settings = {
        'CONCURRENT_REQUESTS': 1,
        'DOWNLOAD_DELAY': 0.5,
        'ROBOTSTXT_OBEY': False,
        'DEFAULT_REQUEST_HEADERS': {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Cookie": 'JSESSIONID=330fade13f909a2825b3af658d032679f95be20abfaad95e85f1ae8f810f3994; wuid=79986797265096; wuid=392541738421331; wuid_createAt=2017-10-04 14:36:27; weather_auth=2; captcha=s%3Aad913bd6e3b3d6a08a100b9cdf1d8ab0.XYneql4rzPDZJlJR%2BK%2B3f0ifCnaXZX9ZTiwj4fqgiwY; Hm_lvt_15fafbae2b9b11d280c79eff3b840e45=1507098988,1507101592; Hm_lpvt_15fafbae2b9b11d280c79eff3b840e45=1507102161; CNZZDATA1255169715=1269827742-1507095123-null%7C1507100523; cn_9a154edda337ag57c050_dplus=%7B%22distinct_id%22%3A%20%2215ee6198fb45f9-0f013b0bdce9f6-464a0129-1fa400-15ee6198fb5246%22%2C%22sp%22%3A%20%7B%22%24_sessionid%22%3A%200%2C%22%24_sessionTime%22%3A%201507102175%2C%22%24dp%22%3A%200%2C%22%24_sessionPVTime%22%3A%201507102175%7D%7D; UM_distinctid=15ee6198fb45f9-0f013b0bdce9f6-464a0129-1fa400-15ee6198fb5246',
            "Host": "www.yidianzixun.com",
            "Upgrade-Insecure-Requests": "1",
            "Pragma": "no-cache",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
        },
    }

    def start_requests(self):
        links = getArticles()
        urls = [links[0]]
        print(urls)
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        page = response.url.split("/")[-2]
        filename = 'quotes-%s.html' % page
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename)