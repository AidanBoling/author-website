import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/published">Published Works</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </div>
    );
}

export default Navbar;
