import { defaultTheme, defaultLightTheme, defaultDarkTheme } from 'react-admin';
// import { green, indigo } from '@mui/material/colors';
import green from '@mui/material/colors/green';
import indigo from '@mui/material/colors/indigo';
import teal from '@mui/material/colors/indigo';

import pink from '@mui/material/colors/pink';
import red from '@mui/material/colors/red';
import { grey } from '@mui/material/colors';

export const customThemeInvariants = {
    sidebar: {
        width: 165, // The default value is 240
        closedWidth: 55, // The default value is 55
    },
    palette: {
        primary: { main: '#2EB872' },
        secondary: { main: '#3CCF4E' },
        // error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    components: {
        ...defaultTheme.components,
        MuiTextField: {
            defaultProps: {
                variant: 'standard',
                // InputLabelProps: {
                //     sx: {
                //         fontSize: '1.25rem',
                //         ml: '.5rem',
                //         transform: 'translate(0, -8px) scale(.75)',
                //     },
                // },
            },
            // styleOverrides: {
            //     root: ({ ownerState }) => ({
            //         ...(ownerState.multiline && {}),
            //     }),
            // },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.variant === 'standard' && {
                        fontSize: '1.25rem',
                        fontStyle: 'italic',
                        // paddingLeft: '.5rem',
                        paddingRight: '.5rem',
                        transform: 'translate(.5rem, -.6rem) scale(.75)',
                    }),
                }),
            },
        },
        MuiInputBase: {
            defaultProps: {
                sx: { ml: '.5rem' },
            },
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.multiline && {
                        border: '2px solid lightgrey',
                        borderRadius: '.2rem',
                        padding: '.5rem',
                        marginLeft: 0,
                    }),
                }),
            },
        },
    },
    // components: {
    //     ...defaultTheme.components,
    //     RaDatagrid: {
    //         styleOverrides: {
    //           root: {
    //               backgroundColor: "Lavender",
    //               "& .RaDatagrid-headerCell": {
    //                   backgroundColor: "MistyRose",
    //               },
    //           }
    //        }
    //     }
    // }
};

export const customLightTheme = {
    ...defaultLightTheme,
    ...customThemeInvariants,

    palette: {
        ...defaultLightTheme.palette,
        ...customThemeInvariants.palette,
        grey: {
            main: grey[600],
            light: grey[400],
            dark: grey[800],
        },
        background: {
            default: '#F6F2F5',
        },
    },
};

export const customDarkTheme = {
    ...defaultDarkTheme,
    ...customThemeInvariants,

    palette: {
        ...defaultDarkTheme.palette,
        ...customThemeInvariants.palette,
        primary: { main: '#55E0A3' },
        secondary: { main: '#3CCF4E' },
        grey: {
            main: grey[500],
            light: grey[300],
            dark: grey[700],
        },
        background: { default: '#151c16' },
    },
    components: {
        ...defaultDarkTheme.components,

        RaAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#25b95b',
                    // backgroundColor: '#2EB872',
                },
            },
        },
        // RaDataGrid: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: '#2EB872',
        //         },
        //     },
        // },
    },
};
