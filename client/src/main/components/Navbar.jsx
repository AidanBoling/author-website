import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
    Link,
    IconButton,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ColorModeButton from '../../app/(main)/components/ColorModeButton';
import BgPatternBox from '../../app/(main)/components/style/BgPatternBox';

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
                            mb: { xs: '.75rem', md: '1.5rem' },
                            mx: 'auto',
                            zIndex: '1',
                        }}>
                        <Link
                            component={RouterLink}
                            to={'/'}
                            underline="none"
                            color="inherit">
                            {title}
                        </Link>
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
                                    component="span"
                                    zIndex={1}
                                    sx={{ fontSize: '300' }}>
                                    <Link
                                        component={RouterLink}
                                        to={page.link}
                                        underline="none"
                                        color="inherit"
                                        sx={{
                                            ':hover': {
                                                color: 'lightgold.light',
                                            },
                                        }}>
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
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}>
                            <List>
                                {pages.map(page => (
                                    <ListItem key={page.name} disablePadding>
                                        <ListItemButton
                                            component={RouterLink}
                                            to={page.link}
                                            color="inherit">
                                            <ListItemText primary={page.name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ColorModeButton />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={'Toggle color mode'}
                                        />
                                    </ListItemButton>
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
