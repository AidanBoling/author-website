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
    Divider,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import OtpCodeField from './OtpCodeFieldSubmit';

function MethodInfo({ method }) {
    const [submitPending, setSubmitPending] = useState(false);
    const authProvider = useAuthProvider();
    const notify = useNotify();

    async function handleSendEmail() {
        setSubmitPending(true);
        await authProvider
            .sendEmailCode()
            .then(() => notify('Email sent', { type: 'success' }))
            .catch(error => {
                console.log(error);
                notify(
                    'Something went wrong. Contact your admin if error persists',
                    { type: 'error' }
                );
            });
        setSubmitPending(false);
    }

    return (
        <Box
            sx={{
                mx: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            {method === 'authApp' && (
                <Typography>
                    Enter code from your authentication app below.
                </Typography>
            )}
            {method === 'email' && (
                <>
                    <LoadingButton
                        //   size="small"
                        onClick={handleSendEmail}
                        endIcon={<SendIcon />}
                        loading={submitPending}
                        loadingPosition="end"
                        variant="outlined">
                        <span>Email Code</span>
                    </LoadingButton>
                    {/* <Button onClick={handleSendEmail} variant="outlined">
                        Email Code
                    </Button> */}
                    <Typography mt={'1rem'}>
                        Send a one-time password to your email, then enter the
                        code below. The code will expire in 10 minutes.
                    </Typography>
                </>
            )}
        </Box>
    );
}

//TODO: fix so that the "back" button takes to login page, NOT dashboard

function MyLoginPage({ theme }) {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('')
    const mfa = JSON.parse(localStorage.getItem('mfa'));
    const [useMethod, setUseMethod] = useState(mfa.info.defaultMethod);
    // const [otherMethod, setOtherMethod] = useState(mfa.info.defaultMethod)
    const [code, setCode] = useState('');
    const [submitted, setSubmitted] = useState(true);

    const notUsed = ['authApp', 'email'].filter(method => method !== useMethod);
    const otherMethod = notUsed[0];
    // console.log('Default method: ', useMethod);
    // console.log('Other method: ', otherMethod);

    const login = useLogin();
    const notify = useNotify();
    const redirect = useRedirect();
    // const navigate = useNavigate();
    const authProvider = useAuthProvider();

    useAuthenticated(); // redirects to login if not authenticated

    function handleToggleMethod() {
        // Check: ...if otherMethod updates when useMethod updates
        setUseMethod(otherMethod);
    }

    //TODO(?): Update this -- extend mfa cookie expire, to accomodate email...?
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
        console.log('Code entered: ', code);
        const mfa = JSON.parse(localStorage.getItem('mfa'));
        console.log('user: ', mfa.user);
        login({ method: useMethod, code: code }).catch(error =>
            notify(error.message, { type: 'error' })
        );
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
                    width: '340px',
                    mt: '10vh',
                    // padding: '2rem',
                }}>
                <Stack gap={3}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            mt={'1.25rem'}
                            mb={'1rem'}>
                            Enter OTP
                        </Typography>
                        <Divider width={'80%'} />
                    </Box>
                    <MethodInfo method={useMethod} />
                    {mfa.info.methodsCount > 1 && (
                        <Box>
                            <Button>Use {otherMethod} instead</Button>
                        </Box>
                    )}
                    <form onSubmit={handleMfaSubmit}>
                        <OtpCodeField
                            control={code}
                            onChange={event => setCode(event.target.value)}
                            note="If code is invalid or expired, you will be
                            redirected to login page"
                        />
                    </form>
                </Stack>
            </Paper>
        </Container>
    );
}

export default MyLoginPage;

// Temp Archive -----------------

//  {!mfa ? (
//                     <>
//                         <Typography>Login</Typography>

//                         <form onSubmit={handleLoginSubmit}>
//                             <Stack gap={3} sx={{ padding: '2rem' }}>
//                                 <input
//                                     name="email"
//                                     type="email"
//                                     value={email}
//                                     onChange={e => setEmail(e.target.value)}
//                                 />
//                                 <input
//                                     name="password"
//                                     type="password"
//                                     value={password}
//                                     onChange={e => setPassword(e.target.value)}
//                                 />
//                             </Stack>
//                             <Button variant="contained" type="submit">
//                                 Login
//                             </Button>
//                         </form>
//                     </>
//                 ) : (
//                     <>
//                     </>)}

// {/* <Stack gap={4} sx={{ margin: '2rem' }}>
//     <TextField
//         variant="outlined"
//         name="code"
//         type="password"
//         value={code}
//         onChange={event => setCode(event.target.value)}
//     />
//     <Button variant="contained" type="submit">
//         Submit
//     </Button>

//     <Typography>
//         <i>Note</i>:
//         <br />
//         If code is invalid or expired, you will be
//         redirected to login page
//     </Typography>
// </Stack>*/}
