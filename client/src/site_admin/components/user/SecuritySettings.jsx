'use client';
import { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Box,
    Stack,
    Divider,
    Typography,
    Button,
    Switch,
    FormControlLabel,
    Link,
    TextField,
} from '@mui/material';
import {
    Title,
    useGetIdentity,
    useAuthenticated,
    useRedirect,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import UserSettingsPageWrapper from '../UserSettingsPageWrapper';

export default function SecuritySettings() {
    const { isLoading, error, data, refetch } = useGetIdentity();
    const [passwordEdit, setPasswordEdit] = useState(false);
    const [passwordSubmitted, setPasswordSubmitted] = useState(false);
    const navigate = useNavigate();

    // console.log('Identity info: ', data);
    useAuthenticated();
    const redirect = useRedirect();

    useEffect(() => {
        // Time out page in 10 minutes
        let timer = setTimeout(() => {
            redirect('/user');
        }, 10 * 60 * 1000);

        return () => {
            // This will clear Timeout if component unmounts, and redirect will not run
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (error) {
            navigate('/user');
            notify(error.message, { type: 'error' });
        }
    }, [error]);

    // TODO:
    function handleNewPasswordSubmit(event) {
        event.preventDefault();
        setPasswordSubmitted(true);
        // use authProvider.changePassword method
    }

    // Triggers opening page to register a method
    function handle2FAEnable() {
        redirect('/user/security/enable-mfa');
    }

    // TODO:
    function handle2FADisable() {
        // Open warning/check dialog first: "Are you sure? This will also unregister all the 2FA methods you've set up"
        // When confirm, send to authProvider.disableMFA method
    }

    return (
        <UserSettingsPageWrapper title="Security Settings">
            {data && (
                <>
                    <Typography
                        sx={{
                            color: 'grey.main',
                        }}>
                        <i>Note</i>: This page times out in 10 minutes
                    </Typography>
                    <Stack gap={2}>
                        <Box>
                            <Typography variant="h5" component="h2" my=".5rem">
                                Password
                            </Typography>
                            <Divider />
                        </Box>
                        <Link
                            onClick={() => setPasswordEdit(true)}
                            sx={{
                                '&:hover': { cursor: 'pointer' },
                            }}>
                            Change Password
                        </Link>
                        {passwordEdit &&
                            (!passwordSubmitted ? (
                                <form
                                    onSubmit={event =>
                                        handleNewPasswordSubmit(event)
                                    }>
                                    <Stack gap={1} sx={{ maxWidth: '300px' }}>
                                        <TextField
                                            variant="outlined"
                                            label="Current password"
                                            required
                                        />
                                        <TextField
                                            variant="outlined"
                                            label="New password"
                                            required
                                        />
                                        <TextField
                                            variant="outlined"
                                            label="New password"
                                            required
                                        />
                                        <Box py={'1.5rem'}>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                sx={{
                                                    width: '100%',
                                                }}>
                                                Submit
                                            </Button>
                                        </Box>
                                    </Stack>
                                </form>
                            ) : (
                                <Typography color="grey.main">
                                    Password change submitted
                                </Typography>
                            ))}
                    </Stack>

                    <Stack gap={2}>
                        <Box>
                            <Typography variant="h5" component="h2" my=".5rem">
                                2FA
                            </Typography>
                            <Divider />
                        </Box>
                        {data && data.mfaEnabled ? (
                            <>
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label={'2FA Enabled'}
                                    onChange={handle2FADisable}
                                />
                                {data.mfaMethods.length >= 0 && (
                                    <>
                                        <Typography
                                            variant="h5"
                                            component="h2"
                                            my=".5rem">
                                            2FA Methods Registered:
                                        </Typography>
                                        {data.mfaMethods.map(method => (
                                            <Typography>
                                                {method.name}
                                            </Typography>
                                        ))}

                                        {/* <Link>Add 2FA method</Link> */}
                                    </>
                                )}
                            </>
                        ) : (
                            <FormControlLabel
                                control={<Switch />}
                                label={'2FA Disabled'}
                                onChange={handle2FAEnable}
                            />
                        )}
                        {data.mfaEnabled && (
                            <>
                                <Typography>2FA method: ...</Typography>
                                <Link href="/admin#/user/security/enable-mfa">
                                    Set up another 2FA method
                                </Link>
                            </>
                        )}
                    </Stack>
                </>
            )}
        </UserSettingsPageWrapper>
    );
}
