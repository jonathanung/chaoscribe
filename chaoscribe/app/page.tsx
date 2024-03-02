"use client";
import React, { useState } from 'react';
import Navbar from "./components/navbar";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [chaosLevel, setChaosLevel] = useState(2);
    return (
        <main className="">
            <Navbar showFullNav={true} isLoggedIn={isLoggedIn} chaosLevel={chaosLevel} setChaosLevel={setChaosLevel} />
            <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
                <div className="flex flex-col w-7/12 h-96 p-4 mb-4 bg-white border rounded-lg shadow-md dark:border-gray-700 my-7">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900">Article Title</h2>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                </div>
                <div className="flex flex-col w-7/12 h-96 p-4 mb-4 bg-white border rounded-lg shadow-md dark:border-gray-700 my-7">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900">Article Title</h2>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                </div>
                <div className="flex flex-col w-7/12 h-96 p-4 mb-4 bg-white border rounded-lg shadow-md dark:border-gray-700 my-7">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900">Article Title</h2>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                </div>
                <div className="flex flex-col w-7/12 h-96 p-4 mb-4 bg-white border rounded-lg shadow-md dark:border-gray-700 my-7">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900">Article Title</h2>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                </div>
                <div className="flex flex-col w-7/12 h-96 p-4 mb-4 bg-white border rounded-lg shadow-md dark:border-gray-700 my-7">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900">Article Title</h2>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                </div>
                <div className="flex flex-col w-7/12 h-96 p-4 mb-4 bg-white border rounded-lg shadow-md dark:border-gray-700 my-7">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900">Article Title</h2>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                </div>
            </div>
        </main>
    );
}
