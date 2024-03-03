"use client"

import { useContext } from "react";
import { createContext } from "react";
import { Article } from "../interfaces/article";
import { waitForDebugger } from "inspector";


export const LikesContext = createContext<{
    Liked: Article[],
    addLiked: (article: Article)=>void
}>({
    Liked: [],  

    addLiked(article: Article)
    {
        this.Liked.push(article);
    }
});