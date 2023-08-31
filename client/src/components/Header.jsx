import React, { useState } from 'react';

function Header() {
    return (
        <div className="navbar">
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/About">Published Works</a>
                <a href="/About">About</a>
                <a href="/Contact">Contact</a>
            </div>
        </div>
    );
}

export default Header;
