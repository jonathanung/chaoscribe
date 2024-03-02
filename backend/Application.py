import DB
import json
import random

class Application:
    def __init__(self):
        self.ArticleCache: dict[list] = {}
        self.UserCache: dict[str, dict] = {}
        self.DBSession = DB.Session()
        self.Sent: dict[str, str] = {}

    def LoadCache(self):
        for article in self.DBSession.query(DB.Article).all():
            if (not(article.level in self.ArticleCache.keys())):
                self.ArticleCache[article.level] = {"en": {}, "fr": {}, "es": {}}

            self.ArticleCache[article.level][article.language][article.id] = article.ToDict()

        for user in self.DBSession.query(DB.User).all():
            self.UserCache[user.id] = { "user": user.ToDict(), "loggedIn": False } 

    def GetArticles(self, level: int = 3, language: str = "en", new: bool = True):
        articles: list[dict] = [] 
        
        try:
            for x in range(level + 1):
                articles += self.ArticleCache[x][language]
            
            return articles

        except KeyError:
            raise Exception("No articles found")
            return []

    def GetUser(self, id: str):
        return self.UserCache[id]
 
    
app = Application()
app.LoadCache()
print(len(app.GetArticles(5)))
