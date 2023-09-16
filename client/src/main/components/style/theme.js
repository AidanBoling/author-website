import { createTheme, alpha } from '@mui/material/styles';

function getDesignTokens(mode) {
    return {
        palette: {
            mode,
            primary: {
                main: '#f3d46b',
                contrastText: 'rgba(24,24,24,0.87)',
                // dark: '#c89659',
            },
            secondary: {
                main: '#785cff',
            },
            forestgreen: {
                main: '#002217',
                light: '#003726',
                dark: '#00100b',
            },
            ...(mode === 'light' && {
                primary: {
                    main: '#00855a',
                    // contrastText: 'rgba(24,24,24,0.87)',
                    // dark: '#c89659',
                },
                background: {
                    default: '#fcfdfc',
                    paper: 'rgba(252,255,254,0.95)',
                },
                tonalOffset: {
                    light: 0.3,
                    dark: 0.3,
                },
            }),
            ...(mode === 'dark' && {
                primary: {
                    main: '#f3d46b',
                    contrastText: 'rgba(24,24,24,0.87)',
                    // dark: '#c89659',
                },
                background: {
                    default: '#00100b',
                    paper: 'rgba(18,18,18,0.95)',
                },
                text: {
                    primary: '#efefef',
                },
                tonalOffset: {
                    light: 0.4,
                    dark: 0.1,
                },
            }),
            // tonalOffset: {
            //     light: 0.4,
            //     dark: 0.1,
            // },
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
        typography: {
            h1: {
                fontSize: '4rem',
            },
            h2: { fontSize: '3rem' },
            h3: { fontSize: '2.2rem', fontWeight: '300' },
            h4: { fontSize: '1.75rem' },
        },
        components: {
            MuiAppBar: {
                // ...(mode === 'light' && {
                styleOverrides: {
                    root: ({ ownerState, theme }) => ({
                        ...(ownerState.color === 'primary' && {
                            backgroundColor: theme.palette.forestgreen.light,
                            color: '#fff',
                        }),
                    }),
                },
                // }),
                // ...(mode === 'dark' && {
                //     styleOverrides: {
                //         root: ({ ownerState, theme }) => ({
                //             ...(ownerState.color === 'primary' && {
                //                 backgroundColor:
                //                     theme.palette.forestgreen.light,
                //                 color: '#fff',
                //             }),
                //         }),
                //     },
                // }),
            },
            MuiButton: {
                ...(mode === 'light' && {
                    styleOverrides: {
                        root: ({ ownerState, theme }) => ({
                            ...(ownerState.variant === 'contained' &&
                                ownerState.color === 'primary' && {
                                    backgroundColor: alpha(
                                        theme.palette.primary.main,
                                        0.95
                                    ),
                                }),
                        }),
                    },
                }),
            },
            MuiTypography: {
                styleOverrides: {
                    root: ({ ownerState, theme }) => ({
                        ...(ownerState.variant === 'subheading1' && {
                            color: theme.palette.text.secondary,
                        }),
                    }),
                },
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
