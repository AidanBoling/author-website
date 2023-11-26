'use client';
// import React, { useMemo } from 'react';
import { createTheme, responsiveFontSizes, alpha } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
// import CssBaseline from '@mui/material/CssBaseline';
import {
    Inter,
    // Red_Hat_Text,
    // Mulish,
    // Gothic_A1,
} from 'next/font/google';

// const font_name = Mulish({
//     subsets: ['latin'],
//     display: 'swap',
//     style: ['normal', 'italic'],
// });

const font_name = Inter({
    subsets: ['latin'],
    display: 'swap',
    style: ['normal'],
});

// const font_name = Red_Hat_Text({
//     subsets: ['latin'],
//     display: 'swap',
//     style: ['normal', 'italic'],
// });
// // With settings:
//         // h5: { fontSize: '1.75rem', fontWeight: '600', letterSpacing: '.04rem' },
//        // h6: { fontSize: '1.2rem', fontWeight: '500' },
//        // body1: {
//        //     marginBottom: '1rem',
//        //     fontWeight: '400',
// //           // letterSpacing: '.03rem',
// //       },

// const font_name = Gothic_A1({
//     subsets: ['latin'],
//     display: 'swap',
//     style: ['normal'],
//     weight: ['200', '300', '400', '500'],
// });
// // // A little tall...? But maybe acceptable
// // With settings:
// //          h5: { fontSize: '1.75rem', fontWeight: '500' },
// //         h6: { fontSize: '1.3rem', fontWeight: '400' },
// //         body1: {
// //             marginBottom: '1rem',
// //             fontWeight: '400',
// //             letterSpacing: '.03rem',
// //         },

const forestgreenBase = {
    main: '#002217',
    light: '#003726',
    lightest: '#09865f',
    dark: '#00100b',
};

const themeBase = {
    palette: {
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

        forestgreenAlpha10: {
            main: alpha(forestgreenBase.main, 0.1),
            light: alpha(forestgreenBase.light, 0.1),
            lightest: alpha(forestgreenBase.lightest, 0.05),
            dark: alpha(forestgreenBase.dark, 0.1),
        },
        forestgreenAlpha60: {
            main: alpha(forestgreenBase.main, 0.6),
            light: alpha(forestgreenBase.light, 0.6),
            dark: alpha(forestgreenBase.dark, 0.6),
        },
        forestgreenAlpha80: {
            main: alpha(forestgreenBase.main, 0.8),
            light: alpha(forestgreenBase.light, 0.8),
            dark: alpha(forestgreenBase.dark, 0.8),
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
    typography: {
        h1: {
            fontSize: '4rem',
        },

        //Inter
        h2: { fontSize: '3rem', fontWeight: '200' },
        h3: { fontSize: '2.6rem', fontWeight: '300' },
        h4: { fontSize: '2.2rem', fontWeight: '300' },
        h5: { fontSize: '1.75rem', fontWeight: '430', letterSpacing: '.01rem' },
        h6: { fontSize: '1.3rem', fontWeight: '375' },
        body1: {
            marginBottom: '1rem',
            fontWeight: '350',
        },

        // // Red Hat
        // h2: { fontSize: '3rem', fontWeight: '200' },
        // h3: { fontSize: '2.6rem', fontWeight: '400' },
        // h4: { fontSize: '2.2rem', fontWeight: '300' },
        // h5: {
        //     fontSize: '1.75rem',
        //     fontWeight: '450',
        //     letterSpacing: '.02rem',
        // },
        // h6: { fontSize: '1.2rem', fontWeight: '400' },
        // body1: {
        //     marginBottom: '1rem',
        //     fontWeight: '390',
        //     letterSpacing: '.03rem',
        // },

        //Mulish
        // h2: { fontSize: '3rem', fontWeight: '200' },
        // h3: { fontSize: '2.6rem', fontWeight: '300' },
        // h4: { fontSize: '2.2rem', fontWeight: '300' },
        // h5: { fontSize: '1.7rem', fontWeight: '500' },
        // h6: { fontSize: '1.3rem', fontWeight: '375' },
        // body1: {
        //     marginBottom: '1.2rem',
        //     fontWeight: '375',
        //     lineHeight: '150%',
        // },
        fontFamily: font_name.style.fontFamily,
    },

    breakpoints: {
        values: {
            xs: 0,
            sxs: 470,
            sm: 600,
            md: 950,
            lg: 1200,
            xl: 1536,
        },
    },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...(ownerState.color === 'primary' && {
                        backgroundColor: theme.palette.forestgreen.light,
                        color: '#fff',
                        boxShadow: theme.shadows[8],
                    }),
                }),
            },
        },
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'darkbg' },
                    style: ({ theme }) => ({
                        color: theme.palette.primary.contrastText,
                    }),
                },
            ],
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...(ownerState.variant === 'subheading1' && {
                        color: theme.palette.text.secondary,
                    }),

                    ...(ownerState.component === 'p' && {
                        marginBottom: '1rem',
                    }),
                }),
            },
        },
        MuiPaper: {
            variants: [
                {
                    props: { variant: 'hero' },
                    style: ({ ownerState, theme }) => ({
                        width: '100%',
                        height: '100%',
                        backgroundColor: alpha(
                            theme.palette.forestgreen.light,
                            0.95
                        ),
                        boxShadow: theme.shadows[ownerState.elevation],

                        color:
                            theme.palette.mode === 'light' &&
                            theme.palette.primary.contrastText,
                    }),
                },
            ],
            // styleOverrides: {
            //     root: ({ ownerState, theme }) => ({
            //         ...(ownerState.className === 'gallery-container' && {
            //             ' ::-webkit-scrollbar': '35px',
            //         }),
            //     }),
            // },
        },

        // MuiCssBaseline: {

        //     styleOverrides: {
        //         '*': {
        //             '&::-webkit-scrollbar': {
        //                 width: 6,
        //                 height: 6,
        //                 backgroundcolor: 'transparent',
        //             },
        //             '&::-webkit-scrollbar-track': {
        //                 backgroundcolor: 'transparent',
        //             },
        //         },
        //     },
        // },
    },
};

const lightThemeOptions = {
    ...themeBase,
    palette: {
        mode: 'light',
        ...themeBase.palette,
        primary: {
            main: '#00855a',
            // contrastText: 'rgba(24,24,24,0.87)',
            // dark: '#c89659',
        },
        grey: {
            main: grey[600],
            light: grey[400],
            dark: grey[800],
            medLight: grey[400],
        },
        background: {
            default: '#fcfdfc',
            paper: 'rgba(252,255,254,0.95)',
        },
        tonalOffset: {
            light: 0.3,
            dark: 0.3,
        },
        text: {
            secondary: 'rgba(0,0,0,0.5)',
        },
    },
    components: {
        ...themeBase.components,
        MuiButton: {
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
        },
    },
};

const darkThemeOptions = {
    ...themeBase,
    palette: {
        mode: 'dark',
        ...themeBase.palette,
        primary: {
            main: '#f3d46b',
            contrastText: 'rgba(24,24,24,0.87)',
            // dark: '#c89659',
        },
        grey: {
            main: grey[500],
            light: grey[300],
            dark: grey[700],
            medLight: grey[400],
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
            dark: 0.2,
        },
    },
};

function buildTheme(themeOptions) {
    let theme = createTheme({ ...themeOptions });
    theme = createTheme(theme, {
        // Custom colors created with augmentColor go here
        palette: {
            lightgold: theme.palette.augmentColor({
                color: {
                    main: '#f3d46b',
                },
                name: 'lightgold',
            }),
            greyAlpha10: {
                main: alpha(theme.palette.grey.main, 0.1),
                light: alpha(theme.palette.grey.light, 0.1),
                dark: alpha(theme.palette.grey.dark, 0.1),
            },
            greyAlpha50: {
                main: alpha(theme.palette.grey.main, 0.5),
                light: alpha(theme.palette.grey.light, 0.5),
                dark: alpha(theme.palette.grey.dark, 0.5),
            },
        },
    });
    theme = responsiveFontSizes(theme);

    return theme;
}

const lightTheme = buildTheme(lightThemeOptions);
const darkTheme = buildTheme(darkThemeOptions);

export { lightTheme, darkTheme, lightThemeOptions, darkThemeOptions };

//
//
// TEMP Archive -----------------------
//

// function getDesignTokens(mode) {
//     return {
//         palette: {
//             mode,
//             // primary: {
//             //     main: '#f3d46b',
//             //     contrastText: 'rgba(24,24,24,0.87)',
//             //     // dark: '#c89659',
//             // },
//             secondary: {
//                 main: '#785cff',
//             },
//             forestgreen: {
//                 main: forestgreenBase.main,
//                 light: forestgreenBase.light,
//                 dark: forestgreenBase.dark,
//             },
//             forestgreenalpha: {
//                 main: alpha(forestgreenBase.main, 0.95),
//                 light: alpha(forestgreenBase.light, 0.95),
//                 dark: alpha(forestgreenBase.dark, 0.95),
//             },

//             ...(mode === 'light' && {
//                 primary: {
//                     main: '#00855a',
//                     // contrastText: 'rgba(24,24,24,0.87)',
//                     // dark: '#c89659',
//                 },
//                 grey: {
//                     main: grey[600],
//                     light: grey[400],
//                     dark: grey[800],
//                 },
//                 background: {
//                     default: '#fcfdfc',
//                     paper: 'rgba(252,255,254,0.95)',
//                 },
//                 tonalOffset: {
//                     light: 0.3,
//                     dark: 0.3,
//                 },
//                 text: {
//                     secondary: 'rgba(0,0,0,0.5)',
//                 },
//             }),

//             ...(mode === 'dark' && {
//                 primary: {
//                     main: '#f3d46b',
//                     contrastText: 'rgba(24,24,24,0.87)',
//                     // dark: '#c89659',
//                 },
//                 grey: {
//                     main: grey[500],
//                     light: grey[300],
//                     dark: grey[700],
//                 },
//                 background: {
//                     default: '#00100b',
//                     paper: 'rgba(18,18,18,0.95)',
//                 },
//                 text: {
//                     primary: '#efefef',
//                 },
//                 tonalOffset: {
//                     light: 0.4,
//                     dark: 0.1,
//                 },
//             }),
//             error: {
//                 main: 'rgba(255,39,67,0.95)',
//             },
//             warning: {
//                 main: '#f59700',
//             },
//             success: {
//                 main: '#388e3c',
//             },
//         },
//         typography: {
//             h1: {
//                 fontSize: '4rem',
//             },
//             h2: { fontSize: '3rem' },
//             h3: { fontSize: '2.2rem', fontWeight: '300' },
//             h4: { fontSize: '1.75rem' },
//         },
//         components: {
//             MuiAppBar: {
//                 // ...(mode === 'light' && {
//                 styleOverrides: {
//                     root: ({ ownerState, theme }) => ({
//                         ...(ownerState.color === 'primary' && {
//                             backgroundColor: theme.palette.forestgreen.light,
//                             color: '#fff',
//                             boxShadow: theme.shadows[8],
//                         }),
//                     }),
//                 },
//                 // }),
//                 // ...(mode === 'dark' && {
//                 //     styleOverrides: {
//                 //         root: ({ ownerState, theme }) => ({
//                 //             ...(ownerState.color === 'primary' && {
//                 //                 backgroundColor:
//                 //                     theme.palette.forestgreen.light,
//                 //                 color: '#fff',
//                 //             }),
//                 //         }),
//                 //     },
//                 // }),
//             },

//             MuiButton: {
//                 ...(mode === 'light' && {
//                     styleOverrides: {
//                         root: ({ ownerState, theme }) => ({
//                             ...(ownerState.variant === 'contained' &&
//                                 ownerState.color === 'primary' && {
//                                     backgroundColor: alpha(
//                                         theme.palette.primary.main,
//                                         0.95
//                                     ),
//                                 }),
//                         }),
//                     },
//                 }),
//             },

//             MuiTypography: {
//                 variants: [
//                     {
//                         props: { variant: 'darkbg' },
//                         style: ({ ownerState, theme }) => ({
//                             color: theme.palette.primary.contrastText,
//                         }),
//                     },
//                     {
//                         props: { variant: 'darkbg' },
//                         style: ({ ownerState, theme }) => ({
//                             color: theme.palette.primary.contrastText,
//                         }),
//                     },
//                 ],
//                 styleOverrides: {
//                     root: ({ ownerState, theme }) => ({
//                         ...(ownerState.variant === 'subheading1' && {
//                             color: theme.palette.text.secondary,
//                         }),
//                     }),
//                 },
//             },

//             MuiPaper: {
//                 variants: [
//                     {
//                         props: { variant: 'hero' },
//                         style: ({ ownerState, theme }) => ({
//                             width: '100%',
//                             height: '100%',
//                             backgroundColor: alpha(
//                                 theme.palette.forestgreen.light,
//                                 0.95
//                             ),
//                             boxShadow: theme.shadows[ownerState.elevation],

//                             color:
//                                 theme.palette.mode === 'light' &&
//                                 theme.palette.primary.contrastText,
//                         }),
//                     },
//                 ],
//             },
//         },
//     };
// }

// let lightTheme = createTheme(getDesignTokens('light'));
// lightTheme = responsiveFontSizes(lightTheme);
// lightTheme = createTheme(lightTheme, {
//     // Custom colors created with augmentColor go here
//     palette: {
//         lightgold: lightTheme.palette.augmentColor({
//             color: {
//                 main: '#f3d46b',
//             },
//             name: 'lightgold',
//         }),
//     },
// });

// let darkTheme = createTheme(getDesignTokens('dark'));

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
