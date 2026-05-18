import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) =>{
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {

        const root = document.documentElement;
        const theme = isDark ? "dark" : "light";
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };
    return(
        <ThemeContext.Provider 
            value={{
                isDark,
                setIsDark,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);