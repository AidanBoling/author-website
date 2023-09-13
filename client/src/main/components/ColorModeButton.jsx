import { useContext } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './style/ThemeWrapper';

function ColorModeButton() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Tooltip title="Toggle dark/light mode" sx={{ ml: 1 }}>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? (
                    <Brightness7Icon />
                ) : (
                    <Brightness4Icon />
                )}
            </IconButton>
        </Tooltip>
    );
}

export default ColorModeButton;
