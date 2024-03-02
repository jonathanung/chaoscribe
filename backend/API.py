from fastapi import FastAPI
from Application import Application

app = FastAPI()

Service = Application()

Service.LoadCache()

@app.get("/{level}/{language}")
async def root(level, language): 
    return Service.GetArticles(int(level), language) 