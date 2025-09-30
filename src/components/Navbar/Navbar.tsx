import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

// Custom NavLink component to handle active state
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li>
            <Link
                to={to}
                className={isActive ? 'active' : ''}
            >
                {children}
            </Link>
        </li>
    );
};

const Navbar = () => {
    return (
        <>
            <nav>
                <ul className="nav-links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/admin">Admin</NavLink>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;