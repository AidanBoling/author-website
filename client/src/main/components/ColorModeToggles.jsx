'use client';
import { useContext } from 'react';
import {
    Tooltip,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './style/ThemeWrapper';
import { useTheme } from 'next-themes';

const colorModeIcon = { light: <Brightness7Icon />, dark: <Brightness4Icon /> };
const toggleText = { light: 'Toggle light mode', dark: 'Toggle dark mode' };

function NavbarModeButton() {
    const { resolvedTheme, setTheme } = useTheme();
    const tooltipText =
        resolvedTheme === 'dark' ? toggleText.light : toggleText.dark;
    const modeIcon =
        resolvedTheme === 'dark' ? colorModeIcon.light : colorModeIcon.dark;

    return (
        <Tooltip title={tooltipText} sx={{ ml: 1 }}>
            <IconButton
                onClick={() =>
                    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
                }
                color="inherit">
                {modeIcon}
            </IconButton>
        </Tooltip>
    );
}

function MenuModeToggle(props) {
    const { resolvedTheme, setTheme } = useTheme();
    const labelText =
        resolvedTheme === 'dark' ? toggleText.light : toggleText.dark;
    const modeIcon =
        resolvedTheme === 'dark' ? colorModeIcon.light : colorModeIcon.dark;

    return (
        <ListItemButton
            onClick={() =>
                setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
            }>
            <ListItemIcon>{modeIcon}</ListItemIcon>
            <ListItemText
                primary={labelText}
                primaryTypographyProps={props.textStyles}
            />
        </ListItemButton>
    );
}

export { NavbarModeButton, MenuModeToggle };
