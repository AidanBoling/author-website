'use client';
import { useState, useEffect } from 'react';
import {
    Box,
    Stack,
    Divider,
    Typography,
    Button,
    Radio,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
} from '@mui/material';
import {
    useGetIdentity,
    useAuthenticated,
    useAuthProvider,
    useNotify,
    useRedirect,
} from 'react-admin';
// import { redirect, useNavigate } from 'react-router-dom';
import UserSettingsPageWrapper from './UserSettingsUtilities';
import OtpCodeField from '../OtpCodeFieldSubmit';

export default function RegisterMFAMethod() {
    const { data, refetch } = useGetIdentity();
    const [methodSelected, setMethodSelected] = useState('');
    // const [submitPending, setSubmitPending] = useState(false);
    const [otpData, setOtpData] = useState(null);
    // const [code, setCode] = useState('');
    const redirect = useRedirect();

    // TODO: use this to disable whichever option already enabled
    const isEnabled = {
        authApp: data && data.mfa.methods.authApp.enabled,
        email: data && data.mfa.methods.email.enabled,
    };

    const isVerified = {
        authApp: data && data.mfa.methods.authApp.verified,
        email: data && data.mfa.methods.email.verified,
    };

    const awaitingVerify = {
        authApp: isEnabled.authApp && !isVerified.authApp,
        email: isEnabled.email && !isVerified.email,
    };

    const showVerification = awaitingVerify.authApp || awaitingVerify.email;

    const authProvider = useAuthProvider();
    const notify = useNotify();
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

    // !For dev/bug checking -- remove later
    useEffect(() => {
        if (data) {
            console.log('Data: ', data);
            console.log('show verification?', showVerification);
        }
    }, [data]);

    useEffect(() => {
        if (showVerification) {
            console.log('awaitingVerify: ', awaitingVerify);

            setMethodSelected(awaitingVerify.authApp ? 'authApp' : 'email');
        }

        if (showVerification && methodSelected !== '') {
            getOtpData();
        }

        if (data && data.mfa.count === 1) {
            setMethodSelected(isVerified.authApp ? 'email' : 'authApp');
        }
    }, [data, methodSelected]);

    function handleChange(event) {
        setMethodSelected(event.target.value);
    }

    async function handleMethodSubmit(event) {
        event.preventDefault();
        // setSubmitPending(true);
        getOtpData();
    }

    // Successful submit -> get OTP data -> triggers refresh of data
    // on refresh, method updated to enabled but not verified, so verification info displayed
    async function getOtpData() {
        await authProvider.settings
            .enableMFAMethod(methodSelected)
            .then(res => {
                console.log('Setting otpData');
                setOtpData(res);
                refetch();
            })
            .catch(() => {
                notify('Error enabling method.', { type: 'error' });
                redirect('/user/security');
            });
        // setSubmitPending(false);
        // notify('Success', { type: 'success' });
    }

    async function handleResendEmailCode() {
        // setSubmitPending(true);
        await authProvider
            .sendEmailCode()
            .catch(error => notify(error.message, { type: 'error' }));
        // setSubmitPending(false);
        notify('Success! Email sent with new code', { type: 'success' });
    }

    useEffect(() => {
        // Redirect if no more methods available to enable
        if (data && data.mfa.count >= 2) {
            redirect('/user/security');
        }
    }, [data]);

    return (
        data &&
        data.mfa.count < 2 && (
            <UserSettingsPageWrapper title="Security Settings">
                <Stack gap={4}>
                    <Box>
                        <Typography variant="h4" component="h2" my=".5rem">
                            Set Up an MFA Method
                        </Typography>
                        <Divider />
                    </Box>

                    {awaitingVerify.authApp || awaitingVerify.email ? (
                        // If either authapp or email still need to be verified, show verification page

                        <>
                            <Typography
                                variant="h5"
                                component="h3"
                                color="primary.main">
                                Step Two – Verify
                            </Typography>

                            {awaitingVerify.authApp
                                ? otpData && (
                                      <>
                                          <Box sx={{ mx: '2rem' }}>
                                              <Typography
                                                  my="1rem"
                                                  sx={{
                                                      fontWeight: 'bold',
                                                  }}>
                                                  1. Save the one-time password
                                                  to your authenticator app (see
                                                  your app&apos;s documentation
                                                  for instructions).
                                              </Typography>
                                              <Typography ml="1.2rem" my="1rem">
                                                  Scan this QR code with your
                                                  app:
                                              </Typography>
                                              <Box ml="1.2rem" mb="1.75rem">
                                                  <img
                                                      src={
                                                          otpData.qrCodeDataUrl
                                                      }
                                                      alt="qr code"
                                                  />
                                              </Box>
                                              <Typography ml="1.2rem" my="1rem">
                                                  Or, enter this url directly
                                                  into the app:
                                              </Typography>
                                              <Typography ml="1.2rem" my="1rem">
                                                  {otpData &&
                                                      otpData.otpauthUrl}
                                              </Typography>
                                          </Box>
                                          <VerificationCodeForm
                                              text="2. Enter the OTP code generated by your app to
                                verify this method is set up correctly."
                                              methodSelected={methodSelected}
                                              indent="1.2rem"
                                          />
                                      </>
                                  )
                                : awaitingVerify.email && (
                                      <>
                                          <Box sx={{ mx: '2rem' }}>
                                              <Typography my="1rem">
                                                  A one-time code has been sent
                                                  to your email. (Be sure to
                                                  check your spam folder.)
                                              </Typography>
                                              <Typography my="1rem">
                                                  Code expired?
                                              </Typography>
                                              <Button
                                                  variant="outlined"
                                                  onClick={
                                                      handleResendEmailCode
                                                  }
                                                  sx={{ mb: '1rem' }}>
                                                  Resend Email
                                              </Button>
                                          </Box>
                                          <VerificationCodeForm
                                              text="Enter the OTP code below to
                                verify this method is set up correctly."
                                              indent="0"
                                              methodSelected={methodSelected}
                                          />
                                      </>
                                  )}

                            {/* <Box>
                            <Typography
                                variant="p"
                                mx="2rem"
                                mt="1rem"
                                sx={{ fontWeight: 'bold' }}>
                                2. Enter the OTP code generated by your app to
                                verify this method is set up correctly.
                            </Typography>
                            <Box ml="1.2rem">
                                <form onSubmit={handleCodeSubmit}>
                                    <OtpCodeField
                                        // title="Enter code to complete verification"
                                        includeSubmit={true}
                                        control={code}
                                        onChange={e => setCode(e.target.value)}
                                    />
                                </form>
                            </Box>
                        </Box> */}
                        </>
                    ) : (
                        // Show form, if no method currently awaiting verification
                        <>
                            <Typography
                                variant="h5"
                                component="h3"
                                color="primary.main">
                                Step One – Select a Method
                            </Typography>
                            <form onSubmit={handleMethodSubmit}>
                                <Box
                                    sx={{
                                        mx: '2rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                    <FormControl>
                                        <FormLabel
                                            id="mfa-methods-radio-group"
                                            sx={{ mb: '.75rem' }}>
                                            Options:
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="mfa-methods-radio-group"
                                            name="mfa-methods-radio-group"
                                            value={methodSelected}
                                            onChange={handleChange}>
                                            <FormControlLabel
                                                value="authApp"
                                                control={<Radio />}
                                                label="Authentication App"
                                                disabled={isVerified.authApp}
                                            />
                                            <FormControlLabel
                                                value="email"
                                                control={<Radio />}
                                                label="Email"
                                                disabled={isVerified.email}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={methodSelected === ''}
                                        sx={{
                                            mt: '2rem',
                                            maxWidth: '175px',
                                        }}>
                                        Enable
                                    </Button>
                                </Box>
                            </form>
                        </>
                    )}
                </Stack>
            </UserSettingsPageWrapper>
        )
    );
}

// TODO (?): Move this?
function VerificationCodeForm({ text, methodSelected, indent }) {
    const { refetch } = useGetIdentity();
    const [code, setCode] = useState('');
    // TODO: Turn all the submitPending back on when add loading button
    // const [submitPending, setSubmitPending] = useState(false);

    const authProvider = useAuthProvider();
    const notify = useNotify();
    // const navigate = useNavigate();
    const redirect = useRedirect();

    async function handleCodeSubmit(event) {
        event.preventDefault();
        // setSubmitPending(true);

        await authProvider.settings
            .verifyMFAMethod(methodSelected, code)
            .then(() => {
                console.log('Code verified, attempting redirect...');
                refetch();
                redirect('/user');

                notify('Success! 2FA method verified', { type: 'success' });
            })
            .catch(error => notify(error.message, { type: 'error' }));
        // setSubmitPending(false);
    }
    return (
        <Box>
            <Typography
                variant="p"
                mx="2rem"
                mt="1rem"
                sx={{ fontWeight: 'bold' }}>
                {text}
            </Typography>
            <Box ml={indent}>
                <form onSubmit={handleCodeSubmit}>
                    <OtpCodeField
                        // title="Enter code to complete verification"
                        includeSubmit={true}
                        control={code}
                        onChange={e => setCode(e.target.value)}
                    />
                </form>
            </Box>
        </Box>
    );
}
