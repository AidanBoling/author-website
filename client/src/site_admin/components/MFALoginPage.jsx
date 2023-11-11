'use client';
import { useState, useEffect } from 'react';
import {
    useAuthenticated,
    useLogin,
    useNotify,
    useAuthProvider,
    useRedirect,
} from 'react-admin';
import { Box, Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import OtpCodeField from './OtpCodeFieldSubmit';
import FormPageWrapper from './FormNoLayoutPageWrapper';

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

// [-] TODO: fix so that the "back" button takes to login page, NOT dashboard
// TODO (later): Fix button "Use {otherMethod} instead" so that authapp is Auth App
function MyLoginPage() {
    useAuthenticated(); // redirects to login if not authenticated
    // const { isLoading, authenticated } = useAuthState();
    // const methodInit = !isLoading
    const mfa = JSON.parse(localStorage.getItem('mfa'));
    const [useMethod, setUseMethod] = useState(mfa && mfa.info.defaultMethod);
    // const useMethod = mfa && mfa.info.defaultMethod;
    // const [otherMethod, setOtherMethod] = useState(mfa.info.defaultMethod)
    const [code, setCode] = useState('');
    // const [submitted, setSubmitted] = useState(true);

    const notUsed = ['authApp', 'email'].filter(method => method !== useMethod);
    const otherMethod = notUsed[0];
    // console.log('Default method: ', useMethod);
    // console.log('Other method: ', otherMethod);

    const login = useLogin();
    const notify = useNotify();
    const redirect = useRedirect();

    function handleToggleMethod() {
        setUseMethod(otherMethod);
    }

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

    function handleMfaSubmit(event) {
        event.preventDefault();
        console.log('Code entered: ', code);
        // const mfa = JSON.parse(localStorage.getItem('mfa'));
        console.log('user: ', mfa.user);
        login({ method: useMethod, code: code }).catch(error =>
            notify(error.message, { type: 'error' })
        );
        //TODO: Troubleshoot notify here -- doesnt notify. (Probably to do with the way login method works...?))
    }

    return (
        mfa && (
            <FormPageWrapper title="Enter OTP" width="340px">
                <MethodInfo method={useMethod} />
                {mfa.info.methodsCount > 1 && (
                    <Button onClick={handleToggleMethod}>
                        Use {otherMethod} instead
                    </Button>
                )}
                <form onSubmit={handleMfaSubmit}>
                    <OtpCodeField
                        control={code}
                        onChange={event => setCode(event.target.value)}
                        note="If code is invalid or expired, you will be
                            redirected to login page"
                    />
                </form>
            </FormPageWrapper>
        )
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
