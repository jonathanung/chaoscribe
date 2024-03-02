"use client";
import Navbar from "../components/navbar";
import React, { useState } from 'react';
import axios from 'axios';

export default function Registration() {
    const styles : React.CSSProperties = {
        backgroundImage: `url(\"../../../chaoscribe-bg.png\")`,
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
    const [user, setUser] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPasswords, setShowPasswords] = useState(false);

    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{8,}$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const togglePasswordsVisibility = () => {
        setShowPasswords(!showPasswords);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        if (!emailRegex.test(user.email)) {
            console.error('Invalid email');
            return;
        }
        if (!passRegex.test(user.password)) {
            console.error('Invalid password');
            return;
        }
        try {
            const response = await axios.post('/api/register', user); //API INTEGRATION TODO
            console.log('Success', response.data);
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <main>
            <div style={styles}></div>
            <Navbar showFullNav={false} isLoggedIn={false} chaosLevel={0} setChaosLevel={()=>{}} chaosMode={false} />
            <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
                <h4>Registration</h4>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-slate-950">
                    <form className="space-y-6 border p-4 rounded-md" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border p-2 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border p-2 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="mt-1 block w-full border p-2 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={user.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full border p-2 rounded-md"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={togglePasswordsVisibility}
                                className="text-sm text-blue-500"
                            >
                                {showPasswords ? 'Hide' : 'Show'} Passwords
                            </button>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            Register
                        </button>
                    </form>
                </div>
                <h4>Already have an account? <a href="/login" className="text-blue-500">Login</a></h4>
            </div>
            <div style={bannerStyle}></div>
        </main>
    );
}
