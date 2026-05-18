import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Moon, SunMedium } from 'lucide-react';

const Header = () => {
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { path: "docs", label: "docs" },
        { path: "features", label: "features" },
        { path: "scalability", label: "scalability" },
        { path: "live-demo", label: "Watch Demo" }
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-100 bg-app-bg border-b border-app-border backdrop-blur-md">
            <div className="max-w-7xl mx-auto py-3 sm:px-6 px-3 flex items-center justify-between">
                <div className='flex gap-10 items-center'>
                    <p className='text-app-text text-2xl tracking-wider font-rogbold cursor-pointer'
                        onClick={() => navigate('/')}
                    >BugLens</p>

                    <div className="sm:gap-3 md:gap-4 lg:gap-6 sm:flex hidden">
                        {menuItems.map((item) => {
                            const active = location.pathname === `/page/${item.path}`;
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(`/page/${item.path}`)}
                                    className={`relative md:px-2 py-1 capitalize text-sm font-medium transition-all duration-300 group
                                        ${active ? "text-app-text" : "text-app-text-h hover:text-app-text"}`}
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    {/* Active Glow */}
                                    <span className={`absolute inset-0 rounded-md bg-purple-700/10 blur-md transition-all duration-300
                                        ${active ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"}`}
                                    />
                                    <span className={`absolute left-0 -bottom-1 h-0.5 bg-linear-to-r from-transparent via-purple-700 to-transparent transition-all duration-300
                                        ${active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"}`}
                                    />
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className='flex items-center sm:gap-5 gap-2'>
                    <button
                        onClick={toggleTheme}
                        className="relative flex items-center justify-between px-1 py-1 gap-1 rounded-full border border-app-text/10 transition-all duration-500"
                    >
                        <SunMedium
                            className={`transition-all duration-500 h-6 w-max p-1
                                ${!isDark
                                    ? "text-app-text rotate-0 scale-100 bg-purple-700/40 rounded-full"
                                    : "text-app-text/40 -rotate-90 scale-75"
                                }`
                            }
                        />
                        <Moon
                            className={`transition-all duration-500 h-6 w-max p-1
                                ${isDark
                                    ? "text-white rotate-0 scale-100 bg-purple-700/40 rounded-full"
                                    : "text-app-text/40 rotate-90 scale-75"
                                }`
                            }
                        />
                    </button>
                    <button className='text-app-text text-sm border border-app-border px-2 py-1 rounded' onClick={() => navigate('/auth/login')}>Log In</button>
                    <button className='bg-white text-black text-sm px-2 py-1 rounded' onClick={() => navigate('/auth/signup')}>Sign Up</button>
                </div>
            </div>
        </header>
    )
}

export default Header;
