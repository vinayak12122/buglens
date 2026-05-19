import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { User } from 'lucide-react';

const Header = () => {
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const {user} = useAuth();

    const getLetter = (name) =>{
        if(!name) return "?";

        const nameParts = name.trim().split(/\s+/);

        if(nameParts.length === 1){
            return nameParts[0].charAt(0).toUpperCase();
        }

        const firstLetter = nameParts[0].charAt(0);
        const lastLetter = nameParts[nameParts.length - 1].charAt(0);
        return (firstLetter + lastLetter).toUpperCase();
    }

    return (
        <header className="sm:flex justify-between items-center px-4 h-max bg-app-bg border-b border-app-border shrink-0 hidden ">
            <div className="flex justify-between items-center w-full ">
                <div className='flex gap-3 items-center p-2'>
                    <p className='text-app-text text-lg tracking-wider font-rogbold'>BugLens </p>
                    <p className='text-app-text/10 text-[10px]'>/</p>
                    <div className='gap-2 flex rounded items-center '>
                        <p className='text-sm capitalize'>{user.name}</p>
                        <p className='text-orange-400 bg-orange-400/20 px-2 rounded-full text-sm'>free</p>
                    </div>
                </div>
                {/* <button
                    onClick={toggleTheme}
                    className="px-4 py-2 rounded-md bg-app-accent text-white transition-all "
                >
                </button> */}
            </div>

        </header>
    )
}

export default Header