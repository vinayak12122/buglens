import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})  => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);


    const checkAuth = async () => {
        try {

            const res = await fetch(`${backendUrl}/auth/me`, {
                credentials: "include"
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }

        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signup = async ({ name, email, password }) => {

        const res = await fetch(`${backendUrl}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            }),
            credentials: "include"
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.detail || "Signup failed");
        }

        await checkAuth();

        return data;
    };

    const login = async (password) => {

        const res = await fetch(`${backendUrl}/auth/verify-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password }),
            credentials: "include"
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || "Login failed");
        }

        await checkAuth();
    };

    const logout = async () => {
        try {

            await fetch(`${backendUrl}/auth/logout`, {
                method: "POST",
                credentials: "include"
            });

        } catch (error) {

        } finally {
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider 
        value={{
            user,
            loading,
            login,
            signup,
            logout,
            checkAuth,
            isAuthenticated: !!user
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);