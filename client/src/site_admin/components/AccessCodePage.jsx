import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    useAuthenticated,
    useLogin,
    useNotify,
    Notification,
    useAuthProvider,
    useRedirect,
} from 'react-admin';
import {
    Container,
    Paper,
    Box,
    Stack,
    Form,
    Typography,
    Button,
    TextField,
} from '@mui/material';
import { redirectDocument } from 'react-router-dom';

export default function AccessCodeForm({ theme }) {
    const [code, setCode] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // const notify = useNotify();
    // const redirect = useRedirect();
    const authProvider = useAuthProvider();

    // useAuthenticated(); // redirects to login if not authenticated

    function handleSubmit(event) {
        event.preventDefault();
        authProvider.registration(code);
        setIsSubmitted(true);

        // Redirect page after 5min (2m?)
        // TODO: Fix and add author website homepage url
        // const timer = setTimeout(() => {
        //     redirectDocument('http://app.localhost:3000/login');
        // }, 1 * 60 * 1000);
    }

    return (
        <Container
            className="login"
            maxWidth={'xl'}
            sx={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '300px',
                    minHeight: '400px',
                    mt: '5vh',
                }}>
                {!isSubmitted ? (
                    <>
                        <Typography variant="h5" component="p" mt={'2rem'}>
                            Enter Code
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Stack gap={4} sx={{ margin: '2rem' }}>
                                <TextField
                                    variant="outlined"
                                    name="code"
                                    type="password"
                                    value={code}
                                    onChange={event =>
                                        setCode(event.target.value)
                                    }
                                />
                                <Button variant="contained" type="submit">
                                    Submit
                                </Button>
                            </Stack>
                        </form>
                    </>
                ) : (
                    <Typography
                        variant="h5"
                        component="h2"
                        m={'2rem'}
                        textAlign={'center'}>
                        Thank you.
                        <br />
                        <br />
                        If your code is valid, you will receive an email with
                        further instructions.
                    </Typography>
                )}
            </Paper>
        </Container>
    );
}
