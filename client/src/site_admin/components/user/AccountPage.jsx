'use client';
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
import { Title, useGetIdentity, useAuthenticated } from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';

export default function AccountPage() {
    const { isLoading, error, data, refetch } = useGetIdentity();

    useAuthenticated();
    // if (isLoading) return <>Loading...</>;
    // if (error) return <>Error</>;

    return (
        <Container maxWidth="xl">
            <Title title="Account Info" />

            <Paper>
                <Box sx={{ padding: '2rem' }}>
                    <Stack gap={4}>
                        {isLoading ? (
                            <>Loading...</>
                        ) : error ? (
                            <>Error</>
                        ) : (
                            <>
                                <Stack gap={2}>
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            component="h2"
                                            my=".5rem">
                                            Info
                                        </Typography>

                                        <Divider />
                                    </Box>
                                    <Box px={'2rem'}>
                                        <Box
                                            display="flex"
                                            alignItems={'center'}
                                            my={'1rem'}>
                                            <Typography my={0}>
                                                Name: {data.fullName}
                                            </Typography>
                                            <Link ml={'auto'}>Change</Link>
                                        </Box>
                                        <p>Email: {data.email}</p>
                                        <p>
                                            Last login:{' '}
                                            {new Date(
                                                data.lastLogin
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                            ,{' '}
                                            {new Date(
                                                data.lastLogin
                                            ).toLocaleTimeString('en-US', {
                                                timeStyle: 'short',
                                            })}
                                        </p>
                                    </Box>
                                </Stack>

                                <Stack gap={2}>
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            component="h2"
                                            my=".5rem">
                                            Security
                                        </Typography>
                                        <Divider />
                                    </Box>
                                    <Stack gap={2} px={'2rem'}>
                                        {data.mfaEnabled ? (
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        defaultChecked
                                                        disabled
                                                    />
                                                }
                                                label={'2FA is enabled'}
                                            />
                                        ) : (
                                            <FormControlLabel
                                                control={<Switch disabled />}
                                                label={'2FA is disabled'}
                                            />
                                        )}
                                        <Box
                                            display="flex"
                                            alignItems={'center'}>
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
                                                Change your password or
                                                two-factor authentication (2FA)
                                                settings. Note, you will be
                                                required to re-confirm all your
                                                credentials.
                                            </Typography>
                                        </Box>
                                        {/* <Box>Set up 2FA</Box> */}
                                        {/* <Box>Add 2FA method</Box> */}
                                    </Stack>
                                </Stack>
                            </>
                        )}
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}
