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