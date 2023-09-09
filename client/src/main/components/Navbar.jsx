import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './style/ThemeWrapper';

function Navbar() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <div className="navbar">
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/published">Published Works</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <div className="nav-settings">
                <IconButton
                    sx={{ ml: 1 }}
                    onClick={colorMode.toggleColorMode}
                    color="inherit">
                    {theme.palette.mode === 'dark' ? (
                        <Brightness7Icon />
                    ) : (
                        <Brightness4Icon />
                    )}
                </IconButton>
            </div>
        </div>
    );
}

export default Navbar;
