import DB
import json
import random
import uuid
import random
from sqlalchemy import delete

def newUUID() -> str:
    return str(uuid.uuid4())

class Application:
    def __init__(self):
        self.ArticleCache: dict[int, dict] = {}
        self.articleIdCache: dict[int, dict] = {}
        self.UserCache: dict[str, dict] = {}
        self.UsernameCache: dict[str, str] = {}
        self.DBSession = DB.Session()
        self.Sent: dict[str, str] = {}

    def LoadCache(self):
        for article in self.DBSession.query(DB.Article).all():
            if (not(article.level in self.ArticleCache.keys())):
                self.ArticleCache[article.level] = {"en": {}, "fr": {}, "es": {}}

            self.ArticleCache[article.level][article.language][article.id] = article.ToDict()
            self.articleIdCache[article.id] = article.ToDict()  

        for user in self.DBSession.query(DB.User).all():
            self.UserCache[user.id] = { "user": user.ToDict(), "loggedIn": False }
            self.UsernameCache[user.username] = user.id 
    
    def GetRandomArticles(self, level: int = 3, language: str = "en"):
        articles: list[dict] = [] 
        shuffledMap: dict = {}
    
        try:
            for x in range(level + 1):
                for key in self.ArticleCache[x][language].keys():
                    articles.append(self.ArticleCache[x][language][key])
            n = len(articles)
            for i in range(n - 1, 0, -1):
                j = random.randint(0, i)  # Choose a random index from 0 to i
                articles[i], articles[j] = articles[j], articles[i]  # Swap elements at i and j
            return articles

        except KeyError:
            raise Exception("No articles found")

    def GetArticles(self, level: int = 3, language: str = "en", new: bool = True):
        articles: list[dict] = [] 

        try:
            for key in self.ArticleCache[level][language].keys():
                articles.append(self.ArticleCache[level][language][key])
            
            n = len(articles)
            for i in range(n - 1, 0, -1):
                j = random.randint(0, i)  # Choose a random index from 0 to i
                articles[i], articles[j] = articles[j], articles[i]  # Swap elements at i and j
            return articles

        except KeyError:
            raise Exception("No articles found")

    def GetArticle(self, id: str):
        try:
            return self.articleIdCache[id]
        except KeyError:
            raise Exception(f"Article with id {id} not found")

    def CreateUser(self, userName: str, passwordHash: str):
        user = DB.User(id=newUUID(), 
                                username=userName, 
                                passwordHash=passwordHash,
                                level=0)

        self.UserCache[user.id] = { "user": user.ToDict(), "loggedIn": False }
        self.UsernameCache[user.username] = user.id

        DB.session.add(user)
        DB.session.commit()

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
    
    def Logout(self, userId: str) -> bool:
        user: dict = None

        try:
            self.UserCache[userId]["loggedIn"] = False

            return True
        except KeyError:
            raise Exception(f"User {userId} not found.")
            
            
    def GetUser(self, id: str):
        return self.UserCache[id]
    
    def Like(self, articleId: str, userId: str):
        if (not(articleId in self.articleIdCache.keys())):
            raise Exception(f"Article with id {articleId} not found.")
        
        user = self.GetUser(userId)
        if (len(DB.session.query(DB.Like).filter(DB.Like.articleId == articleId, DB.Like.userId == userId).all()) < 1):
            like = DB.Like(id=newUUID(), articleId=articleId, userId=userId)
            DB.session.add(like)
            DB.session.commit()

            return like

        else:
            raise Exception(f"Can't add duplicate likes to {articleId}")
    
    def Unlike(self, articleId: str, userId: str):
        if (not(articleId in self.articleIdCache.keys())):
            raise Exception(f"Article with id {articleId} not found.")
        
        user = self.GetUser(userId)

        if (len(DB.session.query(DB.Like).filter(DB.Like.articleId == articleId, DB.Like.userId == userId).all()) >= 1):
            DB.session.query(DB.Like).filter(DB.Like.articleId == articleId, DB.Like.userId == userId).delete()
            DB.session.commit()
        
        else:
            raise Exception(f"Like doesnt exist {articleId}")

    def CreateComment(self, articleId: str, userId: str, content: str):
        if (not(articleId in self.articleIdCache.keys())):
            raise Exception(f"Article with id {articleId} not found.")
        
        user = self.GetUser(userId)

        comment = DB.Comment(id=newUUID(), articleId=articleId, userId=userId, content=content)
        DB.session.add(comment)
        DB.session.commit()

        return comment

    def DeleteComment(self, commentId: str):
        if (len(DB.session.query(DB.Comment).filter(DB.Comment.id == commentId).all()) >= 1):
            DB.session.query(DB.Comment).filter(DB.Comment.id == commentId).delete()
            DB.session.commit()
            return True

        raise Exception(f"Comment with id {commentId} doesn't exist")
    
    def GetLikes(self, articleId: str) -> list:
        return DB.session.query(DB.Like).filter(DB.Like.articleId == articleId).all()
    
    def GetComments(self, articleId) -> list:
        return DB.session.query(DB.Comment).filter(DB.Comment.articleId == articleId).all()
    
# app = Application()

# app.CreateUser("rishit", "a4244aa43ddd6e3ef9e64bb80f4ee952f68232aa008d3da9c78e3b627e5675c8")
# app.Login("rishit", "a4244aa43ddd6e3ef9e64bb80f4ee952f68232aa008d3da9c78e3b627e5675c8")
# app.Logout("rishit")
# app.LoadCache()
# print(app.UserCache)
