'use client';
import { useState } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
import { useNotify, useGetIdentity } from 'react-admin';

export default function UserForm(props) {
    const { refetch } = useGetIdentity();
    // const [submitPending, setSubmitPending] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        currentPassword: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMsg, setErrorMsg] = useState({});
    const notify = useNotify();
    // const authProvider = useAuthProvider();

    function handleChange(event) {
        const { id, value } = event.target;
        setValues({ ...values, [id]: value });

        // Clear errors on value change
        if (id === 'confirmPassword' || id === 'password') {
            // Clear error for both password and confirmPassword if either one is updated
            setErrorMsg({
                ...errorMsg,
                password: false,
                confirmPassword: false,
            });
        } else {
            setErrorMsg({ ...errorMsg, [id]: false });
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        // setSubmitPending(true);
        // ...
        console.log('Form values on submit: ', values);
        await props
            .formRouting(values, props.params)
            .then()
            .then(data => {
                if (data.validationError) {
                    setErrorMsg(data.validationError);
                } else {
                    if (props.hideable) {
                        props.hideForm();
                    }
                    notify(props.successNotify || 'Submitted!', {
                        type: 'success',
                    });
                }
            })
            .catch(error => {
                console.log(error.message);
                notify(error.message, { type: 'error' });
            });
        // setSubmitPending(false);
        if (props.refetchOnSubmit) {
            refetch();
        }
    }

    return (
        <Box mt=".75rem">
            <form onSubmit={handleSubmit}>
                <Stack
                    gap={props.spacing || 1}
                    sx={{
                        maxWidth: props.maxWidth || '300px',
                        width: props.width || '280px',
                    }}>
                    {props.name && (
                        <TextField
                            variant="outlined"
                            id="name"
                            label="Name"
                            required
                            onChange={handleChange}
                            helperText={errorMsg.name || false}
                            error={errorMsg.name ? true : false}
                        />
                    )}
                    {props.email && (
                        <TextField
                            variant="outlined"
                            id="email"
                            label="Confirm email"
                            required
                            onChange={handleChange}
                            helperText={errorMsg.email || false}
                            error={errorMsg.email ? true : false}
                        />
                    )}
                    {props.password && (
                        <UserFormPasswordSection
                            currentpwd={props.currentpwd}
                            onChange={e => handleChange(e)}
                            passwordLabel={props.passwordLabel}
                            errorMsg={errorMsg}
                        />
                    )}

                    <Box py={'1.5rem'}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                width: '100%',
                                mt: '.75rem',
                            }}>
                            Submit
                        </Button>
                        {props.hideable && (
                            <Button
                                onClick={() => props.hideForm()}
                                sx={{
                                    width: '100%',
                                    mt: '.75rem',
                                }}>
                                Cancel
                            </Button>
                        )}
                    </Box>
                </Stack>
            </form>
        </Box>
    );
}

function UserFormPasswordSection(props) {
    const passwordHelperText = 'Password must be at least 12 characters.';

    return (
        <>
            {props.currentpwd && (
                <TextField
                    variant="outlined"
                    id="currentPassword"
                    label="Current Password"
                    required
                    onChange={props.onChange}
                    helperText={props.errorMsg.currentPassword || false}
                    error={props.errorMsg.currentPassword}
                />
            )}
            <TextField
                variant="outlined"
                id="password"
                label={props.passwordLabel || 'Password'}
                required
                onChange={props.onChange}
                helperText={
                    props.errorMsg.password ||
                    (props.errorMsg.confirmPassword && ' ') ||
                    passwordHelperText
                }
                error={
                    props.errorMsg.password || props.errorMsg.confirmPassword
                        ? true
                        : false
                }
            />
            <TextField
                variant="outlined"
                id="confirmPassword"
                label="Confirm Password"
                required
                onChange={props.onChange}
                helperText={props.errorMsg.confirmPassword || false}
                error={props.errorMsg.confirmPassword ? true : false}
            />
        </>
    );
}
