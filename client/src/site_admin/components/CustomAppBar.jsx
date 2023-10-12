'use client';
import React from 'react';
import {
    AppBar,
    TitlePortal,
    Logout,
    UserMenu,
    useUserMenu,
} from 'react-admin';
import SettingsIcon from '@mui/icons-material/Settings';

import { Box, MenuItem, ListItemIcon, IconButton } from '@mui/material';

// const SettingsButton = () => (
//     <IconButton color="inherit">
//         <SettingsIcon />
//     </IconButton>
// );

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const AccountSecurityMenuItem = React.forwardRef((props, ref) => {
    // We are not using MenuItemLink so we retrieve the onClose function from the UserContext
    const { onClose } = useUserMenu();
    return (
        <MenuItem
            onClick={onClose}
            ref={ref}
            component={Link}
            to="/user/security"
            // It's important to pass the props to allow Material UI to manage the keyboard navigation
            {...props}>
            <ListItemIcon>
                <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Security</ListItemText>
        </MenuItem>
    );
});

export default function CustomAppBar() {
    return (
        <AppBar
            color="primary"
            userMenu={
                <UserMenu>
                    <AccountSecurityMenuItem />
                    <Logout />
                </UserMenu>
            }>
            <TitlePortal />
        </AppBar>
    );
}
