'use client';
import { useState } from 'react';
import {
    Box,
    Stack,
    Typography,
    Button,
    FormControlLabel,
    Link,
    TextField,
} from '@mui/material';
import { useAuthProvider, useNotify, useGetIdentity } from 'react-admin';

export default function UserForm(props) {
    const { refetch } = useGetIdentity();
    const [submitPending, setSubmitPending] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const notify = useNotify();
    const authProvider = useAuthProvider();

    function handleChange(event) {
        const { id, value } = event.target;
        setValues({ ...values, [id]: value });
    }

    async function handleSubmit(event, field) {
        event.preventDefault();
        setSubmitPending(true);
        // ...
        console.log('Form values on submit: ', values);
        await props
            .formRouting(values)
            .then(() => {
                if (props.hideable) {
                    props.hideForm();
                }
                notify('Password submitted successfully', { type: 'success' });
            })
            .catch(error => notify(error.message, { type: 'error' }));
        setSubmitPending(false);
        if (props.refetchOnSubmit) {
            refetch();
        }
    }

    return (
        <Box mt=".75rem">
            <form onSubmit={handleSubmit}>
                <Stack gap={props.spacing} sx={{ maxWidth: '300px' }}>
                    {props.name && (
                        <TextField
                            variant="outlined"
                            id="name"
                            label="Name"
                            required
                            onChange={handleChange}
                        />
                    )}
                    {props.email && (
                        <TextField
                            variant="outlined"
                            id="email"
                            label="Confirm email"
                            required
                        />
                    )}
                    {props.password && (
                        <UserFormPasswordSection
                            currentpwd={props.currentpwd}
                            onChange={e => handleChange(e)}
                        />
                    )}

                    <Box py={'1.5rem'}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                width: '100%',
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
    return (
        <>
            {props.currentpwd && (
                <TextField
                    variant="outlined"
                    id="currentPassword"
                    label="Current password"
                    required
                    onChange={props.onChange}
                />
            )}
            <TextField
                variant="outlined"
                id="newPassword"
                label="New password"
                required
                onChange={props.onChange}
            />
            <TextField
                variant="outlined"
                id="confirmPassword"
                label="Confirm password"
                required
                onChange={props.onChange}
            />
        </>
    );
}
