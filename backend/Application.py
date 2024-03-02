import DB
import json
import random
import uuid

def newUUID() -> str:
    return str(uuid.uuid4())

class Application:
    def __init__(self):
        self.ArticleCache: dict[list] = {}
        self.UserCache: dict[str, dict] = {}
        self.UsernameCache: dict[str, str] = {}
        self.DBSession = DB.Session()
        self.Sent: dict[str, str] = {}

    def LoadCache(self):
        for article in self.DBSession.query(DB.Article).all():
            if (not(article.level in self.ArticleCache.keys())):
                self.ArticleCache[article.level] = {"en": {}, "fr": {}, "es": {}}

            self.ArticleCache[article.level][article.language][article.id] = article.ToDict()

        for user in self.DBSession.query(DB.User).all():
            self.UserCache[user.id] = { "user": user.ToDict(), "loggedIn": False }
            self.UsernameCache[user.username] = user.id 

    def GetArticles(self, level: int = 3, language: str = "en", new: bool = True):
        articles: list[dict] = [] 

        try:
            for x in range(level + 1):
                for key in self.ArticleCache[x][language].keys():
                    articles.append(self.ArticleCache[x][language][key])
            
            return articles

        except KeyError:
            raise Exception("No articles found")
            return []

    def CreateUser(self, userName: str, passwordHash: str):
        user = DB.User(id=newUUID(), 
                                username=userName, 
                                passwordHash=passwordHash,
                                level=0)

        self.UserCache[user.id] = { "user": user.ToDict(), "loggedIn": False }
        self.UsernameCache[user.username] = user.id

        return user.ToDict()
    
    def Login(self, username: str, passwordHash: str) -> dict:
        user: dict = None

        try:
            userId = self.UsernameCache[username]
            
            if (passwordHash == self.UserCache[userId]["user"]["passwordHash"]):
                self.UserCache[userId]["loggedIn"] = True
            else:
                raise Exception(f"Invalid password.")

            return self.UserCache[userId]
        except KeyError:
            raise Exception(f"User {username} not found.")
    
    def Logout(self, username: str) -> bool:
        user: dict = None

        try:
            userId = self.UsernameCache[username]
            self.UserCache[userId]["loggedIn"] = False

            return True
        except KeyError:
            raise Exception(f"User {username} not found.")
            
            
    def GetUser(self, id: str):
        return self.UserCache[id]
 
    
# app = Application()

# app.CreateUser("rishit", "a4244aa43ddd6e3ef9e64bb80f4ee952f68232aa008d3da9c78e3b627e5675c8")
# app.Login("rishit", "a4244aa43ddd6e3ef9e64bb80f4ee952f68232aa008d3da9c78e3b627e5675c8")
# app.Logout("rishit")
# app.LoadCache()
# print(app.UserCache)
