import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    useAuthenticated,
    useNotify,
    Notification,
    useAuthProvider,
    useRedirect,
} from 'react-admin';
import { Container, Paper, Box, Stack, Form, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import FormPageWrapper from './FormNoLayoutPageWrapper';
import UserForm from './UserForm';

export default function PasswordReset() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const params = {
        token: searchParams.get('token'),
        id: searchParams.get('id'),
    };

    useAuthenticated({ params: params });

    // const notify = useNotify();
    // const redirect = useRedirect();
    // const navigate = useNavigate();
    const authProvider = useAuthProvider();

    // Check auth every 10 minutes
    useEffect(() => {
        let checkAuthInterval = setInterval(() => {
            console.log(`It's been 10 minutes; checking Auth...`);
            authProvider.checkAuth({ params: params });
        }, 10 * 60 * 1000);

        // This will clear Interval when component unmounts
        return () => {
            clearInterval(checkAuthInterval);
        };
    }, []);

    const resetPasswordRouting = (data, params) =>
        authProvider.preAuthUser.resetPassword(data, params);

    return (
        <FormPageWrapper title="Complete Account Setup" width="340px">
            {!formSubmitted ? (
                <UserForm
                    email
                    password
                    hideable
                    hideForm={() => setFormSubmitted(true)}
                    formRouting={resetPasswordRouting}
                    params={params}
                />
            ) : (
                //Form submitted message (may want to make into a component...? Used in access code and password reset pages too...)
                <Box m={'2rem'}>
                    <Typography variant="h5" component="p" textAlign={'center'}>
                        Submitted.
                        <br />
                        <br />
                        If your account is authenticated, a confirmation email
                        will be sent shortly.
                    </Typography>
                </Box>
            )}
        </FormPageWrapper>
    );
}
