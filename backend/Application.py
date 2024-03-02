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
                self.ArticleCache[article.level] = {"en": {}, "fr": {}, "es": {}}

            self.ArticleCache[article.level][article.language][article.id] = article.ToDict()

    def GetArticles(self, level: int = 3, language: str = "en", new: bool = True):
        articles: list[dict] = [] 
        
        try:
            return self.ArticleCache[level][language]     

        except KeyError:
            raise Exception("No articles found")
            return []

    
app = Application()
app.LoadCache()
print(len(app.GetArticles(5)))