import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './style/ThemeWrapper';

function Navbar() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box className="navbar">
            <div className="nav-links">
                <Link component={RouterLink} to="/" underline="hover">
                    Home
                </Link>
                <Link
                    component={RouterLink}
                    to="/published/books"
                    underline="hover">
                    Books
                </Link>
                <Link
                    component={RouterLink}
                    to="/published/articles"
                    underline="hover">
                    Articles
                </Link>
                <Link
                    component={RouterLink}
                    to="/published/posts"
                    underline="hover">
                    Blog
                </Link>

                <Link component={RouterLink} to="/events">
                    Events
                </Link>
                <Link component={RouterLink} to="/about" underline="hover">
                    About
                </Link>
                <Link component={RouterLink} to="/contact" underline="hover">
                    Contact
                </Link>
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
        </Box>
    );
}

export default Navbar;
