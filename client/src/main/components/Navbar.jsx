import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Menu,
    MenuItem,
    Typography,
    Link,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ColorModeButton from './ColorModeButton';

const pages = [
    { name: 'Home', link: '/' },
    { name: 'Books', link: '/published/books' },
    { name: 'Articles', link: '/published/articles' },
    { name: 'Blog', link: '/published/posts' },
    { name: 'Events', link: '/events' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
];
const title = 'Jane Austen';

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    function handleOpenNavMenu(event) {
        setAnchorElNav(event.currentTarget);
    }
    function handleCloseNavMenu() {
        setAnchorElNav(null);
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{ width: '100%' }} disableGutters>
                <Box
                    component="div"
                    className="bg pattern"
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        opacity: '.3',
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', md: 'column' },
                        width: '100%',
                        mx: '1.5rem',
                    }}>
                    <Typography
                        component="h1"
                        sx={{
                            flexGrow: '1',
                            fontFamily: 'cursive',
                            fontSize: '4rem',
                            textAlign: 'center',
                            mb: { xs: '0', md: '1.5rem' },
                            mx: 'auto',
                        }}>
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            mb: '.5rem',
                        }}>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'space-evenly',
                                width: '80%',
                                maxWidth: '700px',
                                mx: 'auto',
                            }}>
                            {pages.map(page => (
                                <Typography
                                    key={page.name}
                                    variant="h6"
                                    component="span">
                                    <Link
                                        component={RouterLink}
                                        to={page.link}
                                        underline="hover"
                                        color="inherit">
                                        {page.name}
                                    </Link>
                                </Typography>
                            ))}
                        </Box>
                        <Box
                            className="nav-settings"
                            sx={{ display: { xs: 'none', md: 'block' } }}>
                            <ColorModeButton />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: 'flex', md: 'none' },
                        }}>
                        <IconButton
                            size="large"
                            aria-label="navigation menu"
                            aria-controls="menu-navbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-navbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}>
                            <MenuItem>
                                <ColorModeButton />
                            </MenuItem>
                            {pages.map(page => (
                                <MenuItem key={page.name}>
                                    <Typography
                                        variant="h6"
                                        component="span"
                                        textAlign="center">
                                        <Link
                                            component={RouterLink}
                                            to={page.link}
                                            underline="hover"
                                            color="inherit"
                                            onClick={handleCloseNavMenu}>
                                            {page.name}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
