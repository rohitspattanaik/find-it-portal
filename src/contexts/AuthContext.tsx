import { createContext, useContext, useEffect, useState } from "react";
import { authenticate, getSession, logout } from "../api/AuthenticationApis/AuthenticationApis";
import type { Session } from "../api/AuthenticationApis/AuthenticationApis.dto";
import { useNavigate } from "react-router-dom";

const sessionRefreshInterval = 30000; // 30 seconds

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    login: (email: string) => Promise<void>;
    clearSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const fetchSession = async () => {
        try {
            const session = await getSession();
            setSession(session);
            setIsAdmin(session.isAdmin);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
            setIsAuthenticated(false);
            setIsAdmin(false);
            setSession(null);
        }
    }

    const login = async (email: string) => {
        try {
            const session = await authenticate({ email });
            setSession(session);
            setIsAdmin(session.isAdmin);
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            setIsAdmin(false);
            setSession(null);
            throw error;
        }
    }

    const clearSession = async () => {
        await logout();
        setIsAuthenticated(false);
        setIsAdmin(false);
        setSession(null);
        navigate('/');
    }

    //initial session check to see if there's a cookie and if it's valid
    useEffect(() => {
        fetchSession();
    }, []);

    // check the session
    useEffect(() => {
        if (isAuthenticated) {
            fetchSession();
        }
        const interval = setInterval(fetchSession, sessionRefreshInterval);
        return () => clearInterval(interval);
    }, [isAuthenticated]);
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin, clearSession, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
    