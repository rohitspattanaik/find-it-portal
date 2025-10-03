import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "../api/Authentication/Authentication";
import type { Session } from "../api/Authentication/Authentication.dto";

const sessionRefreshInterval = 30000; // 30 seconds

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);


    // check the session
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const session = await getSession();
                setSession(session);
                setIsAuthenticated(true);
                setIsAdmin(session.isAdmin);
            } catch (error) {
                console.error(error);
                setIsAuthenticated(false);
            }
        }
        fetchSession();
        const interval = setInterval(fetchSession, sessionRefreshInterval);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin }}>
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
    