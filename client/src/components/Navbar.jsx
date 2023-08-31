import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/published">Published Works</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>
        </div>
    );
}

export default Navbar;
