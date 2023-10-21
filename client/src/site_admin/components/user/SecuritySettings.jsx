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
import { Title, useGetIdentity, useAuthenticated } from 'react-admin';
import { redirect } from 'react-router-dom';

export default function SecuritySettings() {
    const { isLoading, error, data, refetch } = useGetIdentity();
    const [passwordEdit, setPasswordEdit] = useState(false);
    const [passwordSubmitted, setPasswordSubmitted] = useState(false);
    // const navigate = useNavigate();

    // console.log('Identity info: ', data);
    useAuthenticated();

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

    // useEffect(() => {
    //     if (error) {
    //         navigate('/user');
    //     }
    // }, [error]);

    function handleSubmit(event) {
        event.preventDefault();
        setPasswordSubmitted(true);
    }

    return (
        <Container maxWidth="xl">
            <Title title="Security Settings" />

            <Paper>
                <Box sx={{ padding: '2rem' }}>
                    <Stack gap={4}>
                        {isLoading ? (
                            <>Loading...</>
                        ) : error ? (
                            <>Error</>
                        ) : (
                            <>
                                <Typography
                                    sx={{
                                        color: 'grey.main',
                                    }}>
                                    <i>Note</i>: This page times out in 10
                                    minutes
                                </Typography>
                                <Stack gap={2}>
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            component="h2"
                                            my=".5rem">
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
                                                    handleSubmit(event)
                                                }>
                                                <Stack
                                                    gap={1}
                                                    sx={{ maxWidth: '300px' }}>
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
                                        <Typography
                                            variant="h5"
                                            component="h2"
                                            my=".5rem">
                                            2FA
                                        </Typography>
                                        <Divider />
                                    </Box>
                                    {data.mfaEnabled ? (
                                        <FormControlLabel
                                            control={<Switch defaultChecked />}
                                            label={'2FA Enabled'}
                                        />
                                    ) : (
                                        <FormControlLabel
                                            control={<Switch />}
                                            label={'2FA Disabled'}
                                        />
                                    )}
                                    {/* {!data.mfaEnabled && <Box>Set up 2FA</Box>} */}
                                    {/* <Box>Add 2FA method</Box> */}
                                </Stack>
                            </>
                        )}
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}
