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
    return 

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
