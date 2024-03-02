from sqlalchemy import create_engine, Column, String, Integer, Table, ForeignKey 
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import json
import uuid
import os

con_string = f"postgresql://{os.getenv('user')}:{os.getenv('password')}@localhost:5432/testdb"

engine = create_engine(con_string)
Session = sessionmaker(bind=engine)

connection = engine.connect()

Base = declarative_base()

class Article(Base):
    __tablename__ = "articles"
    id = Column(String(100), primary_key=True)
    level = Column(Integer())
    source = Column(String(100))
    author = Column(String(1024))
    title = Column(String(1024))
    description = Column(String(4096))
    url = Column(String(1024))
    imageUrl = Column(String(1024))
    date = Column(String(100))
    content = Column(String(4096))
    language = Column(String(2))

    def ToDict(self):
        return {
            "id": self.id,
            "language": self.language,
            "level": self.level,
            "source": self.source,
            "author": self.author,
            "title": self.title,
            "description": self.description,
            "url": self.url,
            "imageUrl": self.imageUrl,
            "date": self.date,
            "content": self.content
        }


Base.metadata.create_all(engine)

session = Session()

with open("dump.json", 'r') as fp:
    for article in json.load(fp):
        newsList = article["news"]
        level: int = article["level"]["level"]
        for lang in newsList.keys():
            for news in newsList[lang]:
                a = Article(id=str(uuid.uuid4()),
                            language=lang, 
                            level=level,
                            author=news["author"],
                            source=news["source"]["name"],
                            title=news["title"],
                            description=news["description"],
                            url=news["url"],
                            imageUrl=news["urlToImage"],
                            date=news["publishedAt"],
                            content=news["content"])
                session.add(a)
                session.commit()
            


