// import { createTheme } from '@mui/material/styles';

function getDesignTokens(mode) {
    return {
        palette: {
            mode,
            primary: {
                main: '#22b773',
                contrastText: 'rgba(255,255,255,0.87)',
            },
            secondary: {
                main: '#785cff',
            },
            ...(mode === 'light' && {
                background: {
                    default: '#fcfdfc',
                },
            }),
            tonalOffset: {
                light: 0.7,
                dark: 0.3,
            },
            error: {
                main: 'rgba(255,39,67,0.95)',
            },
            warning: {
                main: '#f59700',
            },
            success: {
                main: '#388e3c',
            },
        },
    };
}

// import { ThemeOptions } from '@mui/material/styles';

// export const themeOptions: ThemeOptions = {
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#22b773',
//       contrastText: 'rgba(255,255,255,0.87)',
//     },
//     secondary: {
//       main: '#785cff',
//     },
//     background: {
//       default: '#fcfdfc',
//     },
//     tonalOffset: {
//       light: 0.7,
//       dark: 0.3,
//     },
//     error: {
//       main: 'rgba(255,39,67,0.95)',
//     },
//     warning: {
//       main: '#f59700',
//     },
//     success: {
//       main: '#388e3c',
//     },
//   },
// };

export default getDesignTokens;
