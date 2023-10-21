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

function MyLoginPage({ theme }) {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const login = useLogin();
    const notify = useNotify();
    const redirect = useRedirect();
    const authProvider = useAuthProvider();
    // const mfa = localStorage.getItem('mfa');

    useAuthenticated(); // redirects to login if not authenticated

    useEffect(() => {
        // Delete mfa after 5 minutes (when it expires anyways)
        let timer = setTimeout(() => {
            console.log('Removing mfa...');
            localStorage.removeItem('mfa');
            redirect('/login');
        }, 5 * 60 * 1000);
        // Note: this will clear Timeout when component unmounts, like in willComponentUnmount,
        // and remove item will not run
        return () => {
            clearTimeout(timer);
        };
    }, []);

    // function handleLoginSubmit(event) {
    //     event.preventDefault();
    //     console.log('email: ', email);
    //     login({ email, password }).catch(error => notify(error.message));
    // }

    function handleMfaSubmit(event) {
        event.preventDefault();
        const mfa = JSON.parse(localStorage.getItem('mfa'));
        console.log('user: ', mfa.user);
        login({ code: code }).catch(error => notify(error.message));
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
                zIndex: 100,
            }}>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '300px',
                    mt: '20vh',
                    // padding: '2rem',
                }}>
                {/* {!mfa ? (
                    <>
                        <Typography>Login</Typography>

                        <form onSubmit={handleLoginSubmit}>
                            <Stack gap={3} sx={{ padding: '2rem' }}>
                                <input
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <input
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Stack>
                            <Button variant="contained" type="submit">
                                Login
                            </Button>
                        </form>
                    </>
                ) : (
                    <> */}

                <Typography variant="h5" component="h2" mt={'2rem'}>
                    Enter OTP Code
                </Typography>

                <form onSubmit={handleMfaSubmit}>
                    <Stack gap={4} sx={{ margin: '2rem' }}>
                        <TextField
                            variant="outlined"
                            name="code"
                            type="password"
                            value={code}
                            onChange={event => setCode(event.target.value)}
                        />
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>

                        <Typography>
                            <i>Note</i>:
                            <br />
                            If code is invalid or expired, you will be
                            redirected to login page
                        </Typography>
                    </Stack>
                </form>

                {/* </>
                )} */}
            </Paper>
        </Container>
    );
}

export default MyLoginPage;
