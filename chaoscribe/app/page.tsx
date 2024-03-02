"use client";
import React, { useEffect, useState } from 'react';
import Navbar from "./components/navbar";
import axios from 'axios';

export default function Home() {

    interface Article {
        id: string,
        source: string
        author: string;
        title: string;
        description: string;
        url: string;
        urlToImage: string;
        publishedAt: string;
        content: string;
        //fields for rishit to add to API
        chaosLevel: number;
        likes: Array<string>
        comments: Array<Comment>
        chaosURL: string // i will deal with this one
    };

    interface Comment {
        id: string,
        userId: string,
        text: string
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [chaosLevel, setChaosLevel] = useState(2);
    const [articles, setArticles] = useState([]);
    const [chaosMode, setChaosMode] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/articles')
            .then((response) => {
                setArticles(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <main className="">
            <Navbar showFullNav={true} isLoggedIn={isLoggedIn} chaosLevel={chaosLevel} setChaosLevel={setChaosLevel} chaosMode={chaosMode} />
            <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
                {articles.map((article: Article, i: number) => {
                    if (article.chaosLevel <= chaosLevel) {
                        return (
                            <div key={i} className="flex flex-col w-7/12 h-96 p-4 mb-4 bg-white border rounded-lg shadow-md dark:border-gray-700 my-7">
                                <div className={`article-container ${i % 2 == 0 ? 'article-left' : 'article-right '}`}>
                                    <div className="">
                                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900">{article.title}</h2>
                                        <h4 className="mt-2 text-sm text-gray-500 dark:text-gray-400">{article.author}</h4>
                                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-700">{article.content}</p>
                                    </div>
                                    <img className="mt-4" src={article.urlToImage} />
                                </div>
                            </div>
                        )
                    }
                })}

            </div>
        </main>
    );
}
