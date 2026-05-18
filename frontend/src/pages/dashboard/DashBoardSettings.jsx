import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Copy,
  ExternalLink,
  Globe,
  KeyRound,
  LogOut,
  Moon,
  Shield,
  Trash2,
  Bell,
  Database,
  Check,
  User,
  MonitorDown,
} from 'lucide-react';

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useProject } from '../../context/ProjectContext';

const DashBoardSettings = () => {

  const { isDark, setIsDark } = useTheme();
  const { logout, user } = useAuth();
  const { projects } = useProject();

  const [isOpen, setIsOpen] = useState(false);

  const [copiedKey, setCopiedKey] = useState(null);

  const dropdownRef = useRef(null);

  const options = [
    { label: 'Light', value: false },
    { label: 'Dark', value: true },
  ];

  const handleSelect = (value) => {
    setIsDark(value);

    localStorage.setItem(
      'theme',
      value ? 'dark' : 'light'
    );

    setIsOpen(false);
  };

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedKey(id);

      setTimeout(() => {
        setCopiedKey(null);
      }, 2000);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const handleOutsideClick = (e) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      'click',
      handleOutsideClick
    );

    return () => {
      window.removeEventListener(
        'click',
        handleOutsideClick
      );
    };

  }, []);

  return (
    <div className='w-full h-full overflow-y-auto scrollbar-hide'>

      <div className='max-w-6xl mx-auto p-8 flex flex-col gap-10'>

        {/* ===================================== */}
        {/* HEADER */}
        {/* ===================================== */}

        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-bold text-app-text'>
            Settings
          </h1>

          <p className='text-app-text-h text-sm'>
            Manage account preferences, project configuration,
            SDK keys and monitoring controls.
          </p>
        </div>

        {/* ===================================== */}
        {/* ACCOUNT */}
        {/* ===================================== */}

        <section className='  flex flex-col gap-6'>

          <div className='flex items-center gap-3'>
            <h2 className='text-xl font-semibold text-app-text'>
              Account Details
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            <div className='flex flex-col gap-2'>
              <p className='text-sm text-app-text-h'>
                Full Name
              </p>

              <div className='px-4 py-3 rounded border border-app-border bg-app-bg text-app-text'>
                {user?.name || 'Unknown User'}
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='text-sm text-app-text-h'>
                Email Address
              </p>

              <div className='px-4 py-3 rounded border border-app-border bg-app-bg text-app-text'>
                {user?.email}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================== */}
        {/* UI PREFERENCES */}
        {/* ===================================== */}

        <section className='flex flex-col gap-6'>

          <div className='flex items-center gap-3'>
            <h2 className='text-xl font-semibold text-app-text'>
              UI Preferences
            </h2>
          </div>

          <div className='flex justify-between items-center'>

            <div className='flex flex-col gap-1'>
              <p className='font-medium text-app-text'>
                Theme
              </p>

              <p className='text-sm text-app-text-h'>
                Customize dashboard appearance
              </p>
            </div>

            <div
              className='relative'
              ref={dropdownRef}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='px-4 py-2 bg-app-bg border border-app-border rounded text-app-text flex items-center gap-3 min-w-32 justify-between text-sm hover:border-app-text-h transition-all'
              >
                {isDark ? 'Dark' : 'Light'}

                <ChevronDown
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                    }`}
                  size={18}
                />
              </button>

              {isOpen && (
                <div className='absolute right-0 top-12 w-full rounded bg-app-bg border border-app-border z-20 overflow-hidden shadow-xl'>

                  {options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left px-4 py-3 hover:bg-app-text/10 transition-all text-sm ${isDark === opt.value
                        ? 'text-blue-500 font-semibold'
                        : 'text-app-text'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===================================== */}
        {/* DANGER ZONE */}
        {/* ===================================== */}

        <section className=''>


          <div className='flex flex-wrap gap-4'>

            <button
              className='group flex items-center gap-3 px-5 py-2 text-sm font-medium transition-all duration-300 border border-red-500/20 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 active:scale-95'
              onClick={() => logout()}
            >
              <LogOut
                size={18}
                className='transition-transform duration-300 group-hover:-translate-x-1'
              />

              <span>
                Sign Out
              </span>
            </button>

          </div>
        </section>

      </div>
    </div>
  );
};

export default DashBoardSettings;