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

import {
    Box,
    MenuItem,
    MenuList,
    ListItemIcon,
    ListItemText,
    IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const AccountPageMenuItem = React.forwardRef((props, ref) => {
    // We are not using MenuItemLink so we retrieve the onClose function from the UserContext
    const { onClose } = useUserMenu();
    return (
        <MenuItem
            onClick={onClose}
            ref={ref}
            component={Link}
            to="/user"
            // It's important to pass the props to allow Material UI to manage the keyboard navigation
            {...props}>
            <ListItemIcon>
                <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
        </MenuItem>
    );
});

export default function CustomAppBar() {
    return (
        <AppBar
            color="primary"
            userMenu={
                <UserMenu>
                    <AccountPageMenuItem />
                    <Logout />
                </UserMenu>
            }>
            <TitlePortal sx={{ display: 'flex', justifyContent: 'center' }} />
        </AppBar>
    );
}
