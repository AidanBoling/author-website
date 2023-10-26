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
    FormControlLabel,
    Link,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    Title,
    useGetIdentity,
    useAuthenticated,
    useRedirect,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import UserSettingsPageWrapper, {
    UserSettingsSection,
} from './UserSettingsUtilities';

export default function SecuritySettings() {
    const { isLoading, error, data, refetch } = useGetIdentity();
    const [passwordEdit, setPasswordEdit] = useState(false);
    const [passwordSubmitPending, setPasswordSubmitPending] = useState(false);
    const [showConfirm, setShowConfirm] = useState({
        changeDefault: false,
        disable2FA: false,
    });

    const otherMethods =
        data &&
        ['authApp', 'email'].filter(
            method =>
                method !== data.mfa.default &&
                data.mfa.methods[method]['verified']
        );
    const methodNames = { authApp: 'Authentication App', email: 'Email' };
    console.log('Other methods: ', otherMethods);

    const navigate = useNavigate();
    const redirect = useRedirect();

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

    useEffect(() => {
        if (error) {
            navigate('/user');
            notify(error.message, { type: 'error' });
        }
    }, [error]);

    // TODO:
    async function handleNewPasswordSubmit(event) {
        event.preventDefault();
        setPasswordSubmitPending(true);
        // use authProvider.changePassword method
        setPasswordSubmitPending(false);
        setPasswordEdit(false);
        notify('Password submitted successfully', { type: 'success' });
    }

    // Triggers opening page to register a method
    function handle2FAEnable() {
        redirect('/user/security/enable-mfa');
    }

    // TODO:
    function handle2FADisable() {
        setShowConfirm({ ...showConfirm, disable2FA: true });
        // Open warning/check dialog first: "Are you sure? This will also unregister all the 2FA methods you've set up"
        // When confirm, send to authProvider.disableMFA method
    }

    function handle2FAChangeDefault() {
        setShowConfirm({ ...showConfirm, changeDefault: true });
        // Open warning/check dialog first: "Change to {methodNames[otherMethods[0]]}?"
        // When confirm, send to authProvider.[...] method
    }

    function ConfirmAction(props) {
        function handleConfirm() {
            // ...
            props.setNotVisible();
        }

        function handleCancel() {
            // ...
            props.setNotVisible();
        }

        return (
            props.visible && (
                <>
                    <Typography variant="caption" my=".5rem">
                        {props.message}
                    </Typography>
                    <Box display="flex" mt=".5rem">
                        <Button
                            onClick={handleCancel}
                            size="small"
                            sx={{ mr: '.5rem' }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            size="small"
                            variant="outlined">
                            Confirm
                        </Button>
                    </Box>
                </>
            )
        );
    }

    return (
        <UserSettingsPageWrapper title="Security Settings">
            {data && (
                <>
                    <Typography
                        sx={{
                            color: 'grey.main',
                        }}>
                        <i>Note</i>: This page times out in 10 minutes
                    </Typography>
                    <Stack gap={3}>
                        <UserSettingsSection title="Password">
                            <Button
                                onClick={() => setPasswordEdit(true)}
                                sx={{
                                    '&:hover': { cursor: 'pointer' },
                                }}>
                                Change Password
                            </Button>
                            {passwordEdit && (
                                <UserForm
                                    onSubmit={event =>
                                        handleNewPasswordSubmit(event)
                                    }>
                                    <UserFormPasswordSection
                                        topField="currentpwd"
                                        spacing={1}
                                        submitPending={passwordSubmitPending}
                                    />
                                </UserForm>
                            )}
                        </UserSettingsSection>
                        <UserSettingsSection title="Two-Factor Authentication (2FA)">
                            {data && data.mfa.enabled ? (
                                <Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}>
                                        <FormControlLabel
                                            control={<Switch defaultChecked />}
                                            label={'2FA Enabled'}
                                            onChange={handle2FADisable}
                                        />
                                        <ConfirmAction
                                            message={
                                                "Are you sure? This will also unregister all the 2FA methods you've set up"
                                            }
                                            visible={showConfirm.disable2FA}
                                            setNotVisible={() =>
                                                setShowConfirm({
                                                    ...showConfirm,
                                                    disable2FA: false,
                                                })
                                            }
                                        />
                                    </Box>

                                    {data.mfa.count > 0 && (
                                        <Box sx={{ my: '1.75rem' }}>
                                            <Typography>Methods:</Typography>
                                            <List>
                                                {[
                                                    data.mfa.default,
                                                    ...otherMethods,
                                                ].map((method, i) => (
                                                    <ListItem
                                                        key={i}
                                                        disablePadding>
                                                        <ListItemIcon>
                                                            <CheckCircleIcon />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                methodNames[
                                                                    method
                                                                ]
                                                            }
                                                            secondary={
                                                                method ===
                                                                    data.mfa
                                                                        .default &&
                                                                '(default)'
                                                            }
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Box>
                                    )}
                                    {data.mfa.count === 1 && (
                                        <>
                                            <Button href="/admin#/user/security/enable-mfa">
                                                Set up a second method
                                            </Button>
                                        </>
                                    )}
                                    {data.mfa.count > 1 && (
                                        <>
                                            <Button
                                                onClick={
                                                    handle2FAChangeDefault
                                                }>
                                                Change default method
                                            </Button>
                                            <ConfirmAction
                                                message={`Change to ${
                                                    methodNames[otherMethods[0]]
                                                }?`}
                                                visible={
                                                    showConfirm.changeDefault
                                                }
                                                setNotVisible={() =>
                                                    setShowConfirm({
                                                        ...showConfirm,
                                                        changeDefault: false,
                                                    })
                                                }
                                            />
                                        </>
                                    )}
                                </Box>
                            ) : (
                                <FormControlLabel
                                    control={<Switch />}
                                    label={'2FA Disabled'}
                                    onChange={handle2FAEnable}
                                />
                            )}
                        </UserSettingsSection>
                    </Stack>
                </>
            )}
        </UserSettingsPageWrapper>
    );
}

function UserForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <Stack gap={props.spacing} sx={{ maxWidth: '300px' }}>
                {props.children}
            </Stack>
            <Box py={'1.5rem'}>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        width: '100%',
                    }}>
                    Submit
                </Button>
            </Box>
        </form>
    );
}

function UserFormPasswordSection(props) {
    return (
        <Stack gap={props.spacing} sx={{ maxWidth: '300px' }}>
            {props.topField === 'email' && (
                <TextField variant="outlined" label="Confirm email" required />
            )}
            {props.topField === 'currentpwd' && (
                <TextField
                    variant="outlined"
                    label="Current password"
                    required
                />
            )}
            <TextField variant="outlined" label="New password" required />
            <TextField variant="outlined" label="Confirm password" required />
            {noSubmit && (
                <Box py={'1.5rem'}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            width: '100%',
                        }}>
                        Submit
                    </Button>
                </Box>
            )}
        </Stack>
    );
}
// TEMP Archive ------------------
// {/* {data.mfa.methods.authApp.verified &&  */}
// {/* <> */}
// {/* <ListItemButton component="a" href="#simple-list"> */}
// {/* <ListItemText primary={methodNames[method]} secondary={method === data.mfa.default ? '(default)'}/> */}
// {/* </ListItemButton> */}
// {/* <Typography>
//             Authentication App
//             {data.mfa.default ===
//                 'authApp' && (
//                 <Typography
//                     component="span"
//                     sx={{
//                         color: 'grey.main',
//                         fontStyle:
//                             'italic',
//                     }}>
//                     {' (default)'}
//                 </Typography>
//             )}
//         </Typography>
//     </>
// )} */}
// {/* {data.mfa.methods.email.verified && (
//     <ul>
//         <ListItemText primary="Email" />

//         <Typography>
//             Email
//             {data.mfa.default ===
//                 'email' && (
//                 <Typography
//                     component="span"
//                     sx={{
//                         color: 'grey.main',
//                         fontStyle:
//                             'italic',
//                     }}>
//                     {' (default)'}
//                 </Typography>
//             )}
//         </Typography>
//     </ul>
// )} */}

// {/* (!passwordSubmitPending ? ( */}

// {/* ) : (
// <Typography color="grey.main">
// Password change submitted
// </Typography>
// ))*/}
