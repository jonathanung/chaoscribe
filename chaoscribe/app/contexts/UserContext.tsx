"use client"

import { useContext } from "react";
import { createContext } from "react";

export interface User
{
    UserId: string,
    PasswordHash: string,
    LoggedIn: boolean,
    Level: number     
}

export const UserContext = createContext<{
    User: User,
    setUser: (user: User) => void
}>({
    User:{
    UserId: "",
    PasswordHash: "",
    LoggedIn: false,
    Level: 0
} as User,

    setUser(user: User)
    {
        this.User = user;
    }
});