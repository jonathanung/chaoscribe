"use client"

import { useContext } from "react";
import { createContext } from "react";
import { Article } from "../interfaces/article";
import { waitForDebugger } from "inspector";


export const ArticleContext = createContext<{
    Articles: Map<number, Article[]>
}>({
    Articles: new Map<number, Article[]>([[0, []], 
    [1, []], 
    [2, []], 
    [3, []], 
    [4, []], 
    [5, []]])
});