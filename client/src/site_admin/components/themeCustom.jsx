import { defaultTheme, defaultLightTheme, defaultDarkTheme } from 'react-admin';
// import { green, indigo } from '@mui/material/colors';
import green from '@mui/material/colors/green';
import indigo from '@mui/material/colors/indigo';
import teal from '@mui/material/colors/indigo';

import pink from '@mui/material/colors/pink';
import red from '@mui/material/colors/red';

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
        background: { default: '#151c16' },
    },
    components: {
        ...defaultDarkTheme.components,

        RaAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#25b95b',
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
