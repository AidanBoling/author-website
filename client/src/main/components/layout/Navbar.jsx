'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    AppBar,
    Box,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Link as MuiLink,
    IconButton,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavbarModeButton, MenuModeToggle } from '../ColorModeToggles';
import BgPatternBox from '../style/BgPatternBox';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import pageContent from '@/main/content/authorDetails.json';
import { NavButton } from '@/main/components/NavButton';
import logo from '@/assets/logo-art.png';

const pages = [
    { name: 'HOME', link: '/' },
    { name: 'BOOKS', link: '/published/books' },
    { name: 'ARTICLES', link: '/published/articles' },
    { name: 'BLOG', link: '/published/posts' },
    { name: 'EVENTS', link: '/events' },
    { name: 'ABOUT', link: '/about' },
    { name: 'CONTACT', link: '/contact' },
];

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
    const isSm = useMediaQuery(theme.breakpoints.down('md'));

    const titleFontSize = isXS
        ? { fontSize: '2.6rem !important' }
        : isSm
        ? { fontSize: '3rem !important' }
        : { fontSize: '3.7rem !important' };
    const navTextStyles = {
        fontWeight: '300',
        fontSize: '1.1rem',
        letterSpacing: '.02rem',
    };
    const menuTextStyles = {
        ...navTextStyles,
        fontSize: '1.3rem',
        color: 'primary.main',
        marginBottom: 0,
    };
    const navbarMarginX = { xs: '1.25rem', lg: '1.75rem' };

    return (
        <AppBar position="static">
            <Toolbar sx={{ width: '100%' }} disableGutters>
                <BgPatternBox height={'100%'} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', md: 'column' },
                        width: '100%',
                        mx: navbarMarginX,
                        position: 'relative',
                    }}>
                    <Box
                        sx={{
                            flexGrow: 0,
                            position: 'absolute',
                            left: 0,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            zIndex: '2',
                        }}>
                        <Box
                            sx={{
                                width: {
                                    xs: '76px',
                                    sm: '64px',
                                    md: '96px',
                                    lg: '120px',
                                },
                                height: {
                                    xs: '76px',
                                    sm: '64px',
                                    md: '96px',
                                    lg: '120px',
                                },
                                padding: '2px',
                                borderRadius: '50%',
                                borderWidth: {
                                    xs: '1.5px',
                                    sm: '1.25px',
                                    md: '2px',
                                    lg: '2.5px',
                                },
                                borderColor: 'lightgold.main',
                                borderStyle: 'solid',
                            }}>
                            <Image
                                src={logo}
                                alt={pageContent.logo.altText}
                                fill
                                style={{
                                    zIndex: '1',
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    </Box>
                    <Typography
                        variant="h1"
                        component="h1"
                        color="lightgold.light"
                        sx={{
                            maxWidth: { xs: '55%', sm: '100%' },
                            flexGrow: '1',
                            fontFamily: 'var(--font-alex-brush), cursive',
                            // fontFamily: "'Great Vibes', cursive",
                            textAlign: 'center',
                            mb: { xs: '.25rem', sm: '.6rem', md: '.6rem' },
                            mt: { xs: '.6rem', sm: '1rem', md: '.8rem' },
                            mx: 'auto',
                            zIndex: '1',
                            ...titleFontSize,
                            letterSpacing: '.01rem',
                        }}>
                        <MuiLink
                            component={Link}
                            href={'/'}
                            underline="none"
                            color="inherit">
                            {pageContent.author.name}
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
                                maxWidth: '725px',
                                mx: 'auto',
                            }}>
                            {pages.map(page => (
                                <NavButton key={page.name} page={page} />
                            ))}
                        </Box>
                        <Box
                            className="nav-settings"
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                position: 'absolute',
                                right: 0,
                                marginTop: '5px',
                            }}>
                            <NavbarModeButton />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            position: 'absolute',
                            height: '100%',
                            right: 0,
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
                                            color="inherit"
                                            sx={{ paddingX: '1.5rem' }}>
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
                                <ListItem
                                    disablePadding
                                    sx={{ paddingX: '.5rem' }}>
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

//
//
// TEMP Archive -------------------
//

//{/* {pages.map(page => (
//<Typography
// key={page.name}
// component="span"
// zIndex={1}
// sx={{ ...navTextStyles }}>
// <MuiLink
//     component={Link}
//     href={page.link}
//     underline="none"
//     color="inherit"
//     sx={{
//         ':hover': {
//             color: 'lightgold.light',
//         },
//     }}>
//     {page.name}
// </MuiLink>
// </Typography>
// ))}

//
//
// <Box
//     component="span"
//     sx={{
//         mb: 0,
//     }}>
//     {pageContent.author.fName}
// </Box>
// <Box
//     component="span"
//     sx={{
//         display: { xs: 'block', sm: 'inline' },
//         // mt: '.5rem',
//     }}>
//     {pageContent.author.lName}
// </Box>
