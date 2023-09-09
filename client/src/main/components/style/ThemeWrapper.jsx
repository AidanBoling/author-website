import React, { useState, useMemo, createContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getDesignTokens from './theme';
import App from '../App';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

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

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* <App /> */}
                {props.element}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default ThemeWrapper;
export { ColorModeContext };
