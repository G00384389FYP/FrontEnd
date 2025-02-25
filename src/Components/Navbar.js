import React from 'react';
import { Link } from 'react-router-dom';



const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Nixers.ie</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                
                <li>
                    <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                    <Link to="/myProfiles">My Profiles</Link>
                </li>                
                                
            </ul>
        </nav>
    );
};

export default Navbar;