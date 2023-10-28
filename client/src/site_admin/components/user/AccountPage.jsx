'use client';
import { useState } from 'react';
import {
    Container,
    Paper,
    Box,
    Stack,
    Divider,
    Typography,
    Button,
    ToggleButton,
    Switch,
    FormControlLabel,
    Link,
} from '@mui/material';
import {
    Title,
    useGetIdentity,
    useAuthenticated,
    useAuthProvider,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import UserSettingsPageWrapper, {
    UserSettingsSection,
} from './UserSettingsUtilities';
import UserForm from '../UserForm';

// TODO (later): User info section into a List (mui)
export default function AccountPage() {
    const { isLoading, error, data, refetch } = useGetIdentity();
    const [nameEdit, setNameEdit] = useState(false);
    const authProvider = useAuthProvider();
    useAuthenticated();

    const changeNameRouting = data => authProvider.settings.changeName(data);

    return (
        <UserSettingsPageWrapper title="Account Info">
            {data && (
                <>
                    <Stack gap={3}>
                        <UserSettingsSection title="Info">
                            <Box
                                display="flex"
                                alignItems={'center'}
                                my={'1rem'}>
                                <Typography my={0}>
                                    Name: {data.fullName || null}
                                </Typography>
                                <Link
                                    onClick={() => setNameEdit(true)}
                                    ml={'auto'}
                                    sx={{ '&:hover': { cursor: 'pointer' } }}>
                                    Change
                                </Link>
                            </Box>
                            {nameEdit && (
                                <UserForm
                                    name
                                    hideable
                                    hideForm={() => setNameEdit(false)}
                                    formRouting={changeNameRouting}
                                    refetchOnSubmit
                                    successNotify="Name changed successfully"
                                />
                            )}
                            <p>Email: {data.email}</p>
                            <p>
                                Last login:{' '}
                                {new Date(data.lastLogin).toLocaleDateString(
                                    'en-US',
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }
                                )}
                                ,{' '}
                                {new Date(data.lastLogin).toLocaleTimeString(
                                    'en-US',
                                    {
                                        timeStyle: 'short',
                                    }
                                )}
                            </p>
                        </UserSettingsSection>
                        <UserSettingsSection title="Security">
                            <Stack gap={4}>
                                {data.mfa.enabled ? (
                                    <FormControlLabel
                                        control={
                                            <Switch defaultChecked disabled />
                                        }
                                        label={'2FA is enabled'}
                                    />
                                ) : (
                                    <FormControlLabel
                                        control={<Switch disabled />}
                                        label={'2FA is disabled'}
                                    />
                                )}
                                <Box display="flex" alignItems={'center'}>
                                    <Button
                                        component={RouterLink}
                                        to="/user/security"
                                        variant="outlined"
                                        sx={{ maxWidth: '275px' }}>
                                        Security Settings
                                    </Button>
                                    <Typography
                                        sx={{
                                            ml: '2rem',
                                            fontSize: '.9rem',
                                            color: 'grey.main',
                                        }}>
                                        Change your password or two-factor
                                        authentication (2FA) settings. Note, you
                                        will be required to re-confirm all your
                                        credentials.
                                    </Typography>
                                </Box>
                            </Stack>
                        </UserSettingsSection>
                    </Stack>
                </>
            )}
        </UserSettingsPageWrapper>
    );
}
