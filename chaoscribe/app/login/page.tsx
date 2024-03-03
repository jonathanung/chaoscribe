"use client";
import Navbar from "../components/navbar";
import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { User, UserContext } from "../contexts/UserContext";
import bcrypt from 'bcryptjs';


export default function Login() {
    const styles : React.CSSProperties = {
        backgroundImage: `url(\"./chaoscribe-bg.png\")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        opacity: 0.05,
        position: 'fixed', 
        top: 0,            
        left: 0,           
        width: '100%',     
        zIndex: -1         
    };
    const bannerStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60px',
        backgroundImage: 'url("../../../banner.png")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundColor: 'black',
        backgroundRepeat: 'no-repeat',
        zIndex: 1000
    };
    const [user, setUser] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);


    const User = useContext(UserContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(user => { return { ...user, [name]: value } })
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const salt = bcrypt.genSaltSync(10);
            const hpass = bcrypt.hashSync(user.password, salt);
            const response = await fetch(`http://${process.env.APIURL}/login`, {
                method: "post",
                mode: "cors",
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({
                    "username": user.username,
                    "passwordHash": hpass
                })
            }); 
        
            console.log(await response.json());
        } catch (error) {
            console.error('Invalid', error);
        }
    };


    return (
        <main>
            <div style={styles}></div>
            <Navbar showFullNav={false} isLoggedIn={false} chaosLevel={0} setChaosLevel={()=>{}} chaosMode={false} />
            <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
                <h4>Login</h4>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-slate-950 text-black">
                    <form className="space-y-6 border p-4 rounded-md" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                name="username"
                                value={user.username}

                                onChange={handleChange}
                                className="mt-1 block w-full border p-2 rounded-md text-black"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <div className="flex items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border p-2 rounded-md text-black"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="ml-2 text-sm text-blue-500"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            Login
                        </button>
                    </form>
                </div>
                <h4>Don't have an account? <a href="/registration" className="text-blue-500">Register</a></h4>
            </div>
            <div style={bannerStyle}></div>
        </main>
    );
}
