import { useMemo } from "react";
import { AppShell, Button, NavLink } from "@mantine/core"
import styles from "./Navbar.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

interface Link {
    href: string;
    label: string;
    subLinks?: Link[];
    isAdmin: boolean;
}

const definedLinks: Link[] = [
    { href: "/", label: "Home", isAdmin: false },
    { href: "/admin", label: "Admin", subLinks: [
        {href: "/admin/users", label: "Users", isAdmin: true},
    ], isAdmin: true },
];

const Navbar = () => {
    const { pathname } = useLocation();
    const { isAuthenticated, isAdmin, clearSession } = useAuth();
    const navigate = useNavigate();

    const navLinks = useMemo(() => {
        const getNavLinks = (links: Link[]) => {
            return links.map((link: Link) => {
                // Skip admin links if user is not admin
                if (link.isAdmin && !isAdmin) return null;
                
                return (
                    <NavLink 
                        key={link.href} 
                        label={link.label} 
                        href={link.href} 
                        active={pathname === link.href}
                    >
                        {link.subLinks && getNavLinks(link.subLinks)}
                    </NavLink>
                );
            }).filter(Boolean); // Remove any null entries from the array
        };
        
        return getNavLinks(definedLinks);
    }, [isAdmin, pathname]);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        await clearSession();
    };

    return (
        <AppShell.Navbar className={styles.navbar}>
            {navLinks}
            <div className={styles.authButtonContainer}>
                {isAuthenticated ? (
                    <Button 
                        className={styles.authButton} 
                        onClick={handleLogout} 
                        size="md" 
                        variant="outline"
                    >
                        Logout
                    </Button>
                ) : (
                    <Button 
                        className={styles.authButton} 
                        onClick={handleLogin} 
                        size="md"
                    >
                        Login
                    </Button>
                )}
            </div>
        </AppShell.Navbar>
    )
}

export default Navbar;