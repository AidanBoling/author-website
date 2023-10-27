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
    Radio,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Link,
    TextField,
} from '@mui/material';
import {
    Title,
    useGetIdentity,
    useAuthenticated,
    useAuthProvider,
    useNotify,
} from 'react-admin';
import { redirect, useNavigate } from 'react-router-dom';
import UserSettingsPageWrapper from './UserSettingsUtilities';
import OtpCodeField from '../OtpCodeFieldSubmit';

export default function RegisterMFAMethod() {
    const { error, data, refetch } = useGetIdentity();
    const [methodSelected, setMethodSelected] = useState('');
    const [submitPending, setSubmitPending] = useState(false);
    const [otpData, setOtpData] = useState(null);
    const [code, setCode] = useState('');
    const redirect = useRedirect();

    // const enabledNotVerified = {}

    // TODO: use this to disable whichever option already enabled
    const isEnabled = {
        authApp: data && data.mfaMethods.authApp.enabled,
        email: data && data.mfaMethods.email.enabled,
    };

    const isVerified = {
        authApp: data && data.mfaMethods.authApp.verified,
        email: data && data.mfaMethods.email.verified,
    };

    const awaitingVerify = {
        authApp: isEnabled.authApp && !isVerified.authApp,
        email: isEnabled.email && !isVerified.email,
    };

    const showVerification = awaitingVerify.email;

    const authProvider = useAuthProvider();
    const notify = useNotify();
    // console.log('Identity info: ', data);
    useAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        // Time out page in 10 minutes
        let timer = setTimeout(() => {
            navigate('/user');
        }, 10 * 60 * 1000);

        return () => {
            // This will clear Timeout if component unmounts, and redirect will not run
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (data) {
            console.log('Data: ', data);
            console.log('show verification?', showVerification);
        }
    }, [data]);

    // useEffect(() => {
    //     if (error) {
    //         redirect('/user');
    //     }
    // }, [error]);

    //TODO:
    // useEffect(() => {
    //     if (otpData) { refetch
    //      // refetch userIdentity
    // (this should update the awaitingVerification,
    // and so the verification info + form should appear for that method
    //     }
    // }, [otpData]);

    useEffect(() => {
        if (showVerification) {
            console.log('awaitingVerify: ', awaitingVerify);

            setMethodSelected(awaitingVerify.authApp ? 'authApp' : 'email');
        }

        if (showVerification && methodSelected !== '') {
            getOtpData();
        }
    }, [data, methodSelected]);

    function handleChange(event) {
        setMethodSelected(event.target.value);
    }

    async function handleMethodSubmit(event) {
        event.preventDefault();
        setSubmitPending(true);
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
            .catch(error => {
                notify('Error enabling method.', { type: 'error' });
                redirect('/user/security');
            });
        setSubmitPending(false);
        // notify('Success', { type: 'success' });
    }

    async function handleResendEmailCode() {
        setSubmitPending(true);
        await authProvider
            .sendEmailCode()
            .catch(error => notify(error.message, { type: 'error' }));
        setSubmitPending(false);
        notify('Success! Email sent with new code', { type: 'success' });
    }

    // async function handleCodeSubmit(event) {
    //     event.preventDefault();
    //     setSubmitPending(true);

    //     await authProvider
    //         .verifyMFAMethod(methodSelected, code)
    //         .catch(error => notify(error.message, { type: 'error' }));
    //     setSubmitPending(false);
    //     console.log('Code verified, attempting redirect...');
    //     navigate('/user');
    //     notify('Success! 2FA method verified', { type: 'success' });
    // }

    return (
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
                                              sx={{ fontWeight: 'bold' }}>
                                              1. Save the one-time password to
                                              your authenticator app (see your
                                              app's documentation for
                                              instructions).
                                          </Typography>
                                          <Typography ml="1.2rem" my="1rem">
                                              Scan this QR code with your app:
                                          </Typography>
                                          <Box ml="1.2rem" mb="1.75rem">
                                              <img
                                                  src={otpData.qrCodeDataUrl}
                                                  alt="qr code"
                                              />
                                          </Box>
                                          <Typography ml="1.2rem" my="1rem">
                                              Or, enter this url directly into
                                              the app:
                                          </Typography>
                                          <Typography ml="1.2rem" my="1rem">
                                              {otpData && otpData.otpauthUrl}
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
                                              A one-time code has been sent to
                                              your email. (Be sure to check your
                                              spam folder.)
                                          </Typography>
                                          <Typography my="1rem">
                                              Code expired?
                                          </Typography>
                                          <Button
                                              variant="outlined"
                                              onClick={handleResendEmailCode}
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
                                            disabled={isEnabled.authApp}
                                        />
                                        <FormControlLabel
                                            value="email"
                                            control={<Radio />}
                                            label="Email"
                                            disabled={isEnabled.email}
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
    );
}

function VerificationCodeForm({ text, methodSelected, indent }) {
    const { refetch } = useGetIdentity();
    const [code, setCode] = useState('');
    const [submitPending, setSubmitPending] = useState(false);

    const authProvider = useAuthProvider();
    const notify = useNotify();
    const navigate = useNavigate();

    async function handleCodeSubmit(event) {
        event.preventDefault();
        setSubmitPending(true);

        await authProvider.settings
            .verifyMFAMethod(methodSelected, code)
            .catch(error => notify(error.message, { type: 'error' }));
        setSubmitPending(false);
        console.log('Code verified, attempting redirect...');
        navigate('/user');
        refetch();

        notify('Success! 2FA method verified', { type: 'success' });
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
