'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
    AppBar,
    Box,
    Toolbar,
    Drawer,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Link as MuiLink,
    IconButton,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavbarModeButton, MenuModeToggle } from './ColorModeToggles';
import BgPatternBox from './style/BgPatternBox';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const pages = [
    { name: 'HOME', link: '/' },
    { name: 'BOOKS', link: '/published/books' },
    { name: 'ARTICLES', link: '/published/articles' },
    { name: 'BLOG', link: '/published/posts' },
    { name: 'EVENTS', link: '/events' },
    { name: 'ABOUT', link: '/about' },
    { name: 'CONTACT', link: '/contact' },
];
const title = 'Jane Austen';

function Navbar() {
    const [drawerState, setDrawerState] = useState(false);

    const toggleDrawer = open => event => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setDrawerState(open);
    };

    const theme = useTheme();
    const isXS = useMediaQuery(theme.breakpoints.down('sm'));

    const titleFontSize = isXS && { fontSize: '3rem' };
    const navTextStyles = {
        fontWeight: '300',
        fontSize: '1.1rem',
        letterSpacing: '.02rem',
    };
    const menuTextStyles = {
        ...navTextStyles,
        fontSize: '1.3rem',
        color: 'primary.dark',
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ width: '100%' }} disableGutters>
                <BgPatternBox height={'100%'} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', md: 'column' },
                        width: '100%',
                        mx: '1.75rem',
                    }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        color="lightgold.light"
                        sx={{
                            flexGrow: '1',
                            fontFamily: 'cursive',
                            textAlign: 'center',
                            my: { xs: '.5rem' },
                            pb: { xs: '.75rem', md: '1rem' },
                            mx: 'auto',
                            zIndex: '1',
                            ...titleFontSize,
                        }}>
                        <MuiLink
                            component={Link}
                            href={'/'}
                            underline="none"
                            color="inherit">
                            {title}
                        </MuiLink>
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
                                alignItems: 'center',
                                width: '85%',
                                maxWidth: '775px',
                                mx: 'auto',
                            }}>
                            {pages.map(page => (
                                <Typography
                                    key={page.name}
                                    component="span"
                                    zIndex={1}
                                    sx={{ ...navTextStyles }}>
                                    <MuiLink
                                        component={Link}
                                        href={{
                                            pathname: page.link,
                                            query: { name: 'test' },
                                        }}
                                        underline="none"
                                        color="inherit"
                                        sx={{
                                            ':hover': {
                                                color: 'lightgold.light',
                                            },
                                        }}>
                                        {page.name}
                                    </MuiLink>
                                </Typography>
                            ))}
                        </Box>
                        <Box
                            className="nav-settings"
                            sx={{ display: { xs: 'none', md: 'block' } }}>
                            <NavbarModeButton />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            position: 'absolute',
                            height: '100%',
                            right: '1.75rem',
                            display: { xs: 'flex', md: 'none' },
                            zIndex: '2',
                        }}>
                        <IconButton
                            size="large"
                            aria-label="navigation menu"
                            aria-controls="menu-navbar"
                            aria-haspopup="true"
                            onClick={toggleDrawer(true)}
                            color="inherit"
                            sx={{
                                alignSelf: 'center',
                            }}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Drawer
                        id="menu-navbar"
                        anchor={'right'}
                        open={drawerState}
                        onClose={toggleDrawer(false)}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}>
                        <Box
                            sx={{ width: 300 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}>
                            <List>
                                {pages.map(page => (
                                    <ListItem key={page.link} disablePadding>
                                        <ListItemButton
                                            component={Link}
                                            href={page.link}
                                            color="inherit">
                                            <ListItemText
                                                primary={page.name}
                                                primaryTypographyProps={
                                                    menuTextStyles
                                                }
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                            <List>
                                <ListItem disablePadding>
                                    <MenuModeToggle
                                        textStyles={menuTextStyles}
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
