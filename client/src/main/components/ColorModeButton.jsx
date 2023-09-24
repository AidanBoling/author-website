'use client';
import { useContext } from 'react';
import { Tooltip, IconButton } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './style/ThemeWrapper';
import { useTheme } from 'next-themes';

function ColorModeButton() {
    // const theme = useTheme();
    const { resolvedTheme, setTheme } = useTheme();
    // const colorMode = useContext(ColorModeContext);

    return (
        <Tooltip title="Toggle dark/light mode" sx={{ ml: 1 }}>
            <IconButton
                onClick={() =>
                    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
                }
                color="inherit">
                {resolvedTheme === 'dark' ? (
                    <Brightness7Icon />
                ) : (
                    <Brightness4Icon />
                )}
            </IconButton>
        </Tooltip>
    );
}

export default ColorModeButton;
