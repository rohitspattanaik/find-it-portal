import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import Button from '../Button/Button';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../api/Authentication/Authentication';

// Custom NavLink component to handle active state
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const location = useLocation();
    const isActive = location.pathname === '/' ? to === '/' : location.pathname.includes(to) && to !== '/'; // there has to be a better way...

    return (
        <li>
            <Link
                to={to}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
                {children}
            </Link>
        </li>
    );
};

const PrimaryNavbar = ({ isAuthenticated, handleAuthClick }: { isAuthenticated: boolean; handleAuthClick: () => void }) => {
    return (
        <div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/admin">Admin</NavLink>
                </ul>
                <Button className={styles.loginButton} text={isAuthenticated ? "Logout" : "Login"} onClick={handleAuthClick} />
            </nav>
        </div>
    );
}

const AdminNavbar = () => {
    return (
        <div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <NavLink to="/admin/users">Users</NavLink>
                    <NavLink to="/admin/collections">Collections</NavLink>
                </ul>
            </nav>
        </div>
    );
};


const Navbar = () => {

    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useAuth();
    const location = useLocation();

    const handleAuthClick = async () => {
        if (isAuthenticated) {
            await logout();
            setIsAuthenticated(false);
            setIsAdmin(false);
        } else {
            navigate('/login');
        }
    }

    return (
        <div>
            <PrimaryNavbar isAuthenticated={isAuthenticated} handleAuthClick={handleAuthClick} />

            {location.pathname.includes("/admin") && <AdminNavbar />}
            
        </div>
    );
};

export default Navbar;