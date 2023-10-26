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
import { useAuthProvider, useNotify } from 'react-admin';

export default function UserForm(props) {
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

    function handleSubmit(event, field) {
        event.preventDefault();
        setSubmitPending(true);
        // ...
        console.log('Form values on submit: ', values);
        //...
        setSubmitPending(false);
        if (props.hideable) {
            props.hideForm();
        }
        notify('Password submitted successfully', { type: 'success' });
    }

    function handleChange(event) {
        const { id, value } = event.target;
        setValues({ ...values, [id]: value });
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
