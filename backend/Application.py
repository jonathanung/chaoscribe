import DB
import json
import random

class Application:
    def __init__(self):
        self.ArticleCache: dict[list] = {}
        self.DBSession = DB.Session()

    def LoadCache(self):
        for article in self.DBSession.query(DB.Article).all():
            if (not(article.level in self.ArticleCache.keys())):
                self.ArticleCache[article.level] = []

            self.ArticleCache[article.level].append(article)

    def GetArticles(self, level: int = 3, language: str = "en", new: bool = True):
        articles: list[dict] = []

        for x in range(level + 1):
            l = self.ArticleCache[x]
            for article in l:
                articles.append(article.ToDict())

        return articles
            
    
# app = Application()
# app.LoadCache()
# print(len(app.GetArticles(3)))