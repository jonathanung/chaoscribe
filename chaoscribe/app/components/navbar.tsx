import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ showFullNav, isLoggedIn, chaosLevel, setChaosLevel, chaosMode }: { showFullNav: boolean; isLoggedIn: boolean; chaosLevel: number, setChaosLevel: (chaosLevel: number) => void; chaosMode: boolean }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChaosLevel(Number(event.target.value));
    };

    const showTooltip = () => {
        setIsTooltipVisible(true);
    };

    const hideTooltip = () => {
        setIsTooltipVisible(false);
    };
    
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50">
            {!showFullNav &&
                (<div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">chaoscribe</span>
                    </Link>
                </div>
            )}
            {showFullNav &&
                (<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">chaoscribe</span>
                    </Link>
                    {isLoggedIn && (
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" onClick={toggleDropdown}>
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                        </button>
                        {isDropdownOpen && (
                            <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    )}
                    {!isLoggedIn && (
                        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <Link href="/login" className="text-sm font-medium text-gray-900 dark:text-white bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out">
                                Login
                            </Link>
                        </div>
                )}
                {chaosMode && (
                    <div className="flex items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        
                        <label htmlFor="default-range" className="block mb-2 font-medium text-gray-900 dark:text-white h-full">Chaos Level</label>
                        <div className="relative px-2 flex items-center h-full">
                            <input id="default-range" type="range" value={chaosLevel} onChange={handleSliderChange} onMouseEnter={showTooltip} onMouseLeave={hideTooltip} min="0" max="6" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                            {isTooltipVisible && (
                                <div className="absolute left-0 top-[calc(100%+5px)] w-full text-center">
                                    <span className="bg-gray-700 text-white text-xs rounded py-1 px-2">{chaosLevel}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                </div>
                )}
        </nav>
    );
}
