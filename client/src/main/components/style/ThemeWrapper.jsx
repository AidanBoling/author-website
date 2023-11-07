'use client';
// import '@/main/styles/styles.css';

import { useState, useEffect } from 'react';
// import useMediaQuery from '@mui/material/useMediaQuery';
import {
    ThemeProvider,
    // createTheme,
    // responsiveFontSizes,
    // alpha,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import getDesignTokens from '@/main/components/style/theme';
import { darkTheme, lightTheme } from '@/main/components/style/theme';
import { useTheme } from 'next-themes';

// export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeWrapper(props) {
    const { resolvedTheme, systemTheme } = useTheme();
    console.log('Prefers mode: ', systemTheme);
    const [currentTheme, setCurrentTheme] = useState(lightTheme);

    useEffect(() => {
        resolvedTheme === 'light'
            ? setCurrentTheme(lightTheme)
            : setCurrentTheme(darkTheme);
    }, [resolvedTheme]);

    const [mounted, setMounted] = useState(false);
    // const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    // console.log('Prefers dark mode: ', prefersDarkMode);
    // // prefersDarkMode ? 'light' : 'dark'
    // const [mode, setMode] = useState('dark');

    // const colorMode = useMemo(
    //     () => ({
    //         toggleColorMode: () => {
    //             setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    //         },
    //     }),
    //     []
    // );

    // let theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    // let lightThemeChosen = useMemo(
    //     () => createTheme({ ...lightTheme }),
    //     [mode]
    // );
    // lightThemeChosen = themeAdjust(lightThemeChosen);

    // let darkThemeChosen = useMemo(() => createTheme({ ...darkTheme }), [mode]);
    // darkThemeChosen = themeAdjust(darkThemeChosen);

    return (
        // <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
        // </ColorModeContext.Provider>
    );
}

export default ThemeWrapper;
