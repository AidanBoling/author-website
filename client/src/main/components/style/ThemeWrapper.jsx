'use client';
// import '@/main/styles/styles.css';

import React, { useState, useMemo, createContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
    alpha,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getDesignTokens from './theme';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeWrapper(props) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    console.log('Prefers dark mode: ', prefersDarkMode);

    const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        []
    );

    let theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    theme = createTheme(theme, {
        // Custom colors created with augmentColor go here
        palette: {
            lightgold: theme.palette.augmentColor({
                color: {
                    main: '#f3d46b',
                },
                name: 'lightgold',
            }),
            forestgreenalpha: {
                main: alpha(theme.palette.forestgreen.main, 0.95),
                light: alpha(theme.palette.forestgreen.light, 0.95),
                dark: alpha(theme.palette.forestgreen.dark, 0.95),
            },
        },
    });

    theme = responsiveFontSizes(theme);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {props.children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default ThemeWrapper;
