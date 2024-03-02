from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from Application import Application

app = FastAPI()

Service = Application()

Service.LoadCache()

class UserModel(BaseModel):
    username: str
    passwordHash: str

class UserIdModel(BaseModel):
    userid: str 

class LikeModel(BaseModel):
    articleid: str
    userid: str

class CommentModel(BaseModel):
    articleid: str
    userid: str
    content: str

class CommentIdModel(BaseModel):
    commentid: str

class ArticleIdModel(BaseModel):
    articleid: str

@app.get("/{level}/{language}")
async def GetArticles(level, language): 
    articles: list[dict] = None
    
    try:
        articles = Service.GetArticles(int(level), language) 

    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])
    
    return articles

@app.post("/login")
async def Login(model: UserModel):
    try:
        return Service.Login(model.username, model.passwordHash) 

    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])

@app.post("/user")
async def Logout(userId: UserIdModel):
    try:
        return Service.Logout(userId.userid) 

    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])

@app.post("/register")
async def Register(model: UserModel):
    try:
        return Service.CreateUser(model.username, model.passwordHash) 

    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])

@app.get("/user")
async def GetUserByUsername(userId: UserIdModel):
    try:
        return [Service.GetUser(userId.userid)]
    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])

@app.post("/like")
async def Like(like: LikeModel):
    try:
        return Service.Like(like.articleid, like.userid)

    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])

@app.post("/unlike")
async def Unlike(like: LikeModel):
    try:
        return Service.Unlike(like.articleid, like.userid)

    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])


@app.post("/comment")
async def Comment(comment: CommentModel):
    try:
        return Service.CreateComment(comment.articleid, comment.userid, comment.content)

    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])

@app.post("/uncomment")
async def Unlike(commentId: CommentIdModel):
    try:
        return Service.DeleteComment(commentId.commentid)

    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])


@app.get("/comments")
async def GetComments(articleId: ArticleIdModel):
    try:
        return Service.GetComments(articleId.articleid)

    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])


@app.get("/likes")
async def GetLikes(articleId: ArticleIdModel):
    try:
        return Service.GetLikes(articleId.articleid)

    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])

