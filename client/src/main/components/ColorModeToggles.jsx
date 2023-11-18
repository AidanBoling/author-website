'use client';
import {
    Tooltip,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
// import Brightness3Icon from '@mui/icons-material/Brightness3';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
// import { ColorModeContext } from './style/ThemeWrapper';
import { useTheme } from 'next-themes';

const colorModeIcon = { light: <LightModeIcon />, dark: <NightsStayIcon /> };
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
            <ListItemIcon sx={{ minWidth: '40px' }}>{modeIcon}</ListItemIcon>
            <ListItemText
                primary={labelText}
                primaryTypographyProps={props.textStyles}
            />
        </ListItemButton>
    );
}

export { NavbarModeButton, MenuModeToggle };
