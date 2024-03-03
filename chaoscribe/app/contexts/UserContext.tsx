"use client"

import { useContext } from "react";
import { createContext } from "react";

export interface User
{
    UserId: string
    PasswordHash: string
    LoggedIn: boolean
    Level: number
    UserName: string
}

export const UserContext = createContext<{
    User: User,
    setUser: (user: User) => void
}>({
    User:{
    UserId: "a1d0a67e-28c0-4593-a951-7d9126372132",
    UserName: "rishit",
    PasswordHash: "a4244aa43ddd6e3ef9e64bb80f4ee952f68232aa008d3da9c78e3b627e5675c8",
    LoggedIn: true,
    Level: 0
} as User,

    setUser(user: User)
    {
        this.User = user;
    }
});