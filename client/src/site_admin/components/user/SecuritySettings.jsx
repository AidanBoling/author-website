'use client';
import { useState, useEffect } from 'react';
import {
    Box,
    Stack,
    Typography,
    Button,
    Switch,
    FormControlLabel,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    useGetIdentity,
    useAuthenticated,
    useRedirect,
    useAuthProvider,
    useNotify,
} from 'react-admin';
import UserSettingsPageWrapper, {
    UserSettingsSection,
} from './UserSettingsUtilities';
import UserForm from '../UserForm';

export default function SecuritySettings() {
    useAuthenticated();
    const { error, data } = useGetIdentity();
    const [passwordEdit, setPasswordEdit] = useState(false);
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
    // console.log('Other methods: ', otherMethods);
    const authProvider = useAuthProvider();
    // const navigate = useNavigate();
    const redirect = useRedirect();
    const notify = useNotify();

    // useAuthenticated();

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
            redirect('/user');
            notify(error.message, { type: 'error' });
        }
    }, [error]);

    const changePasswordRouting = data =>
        authProvider.settings.changePassword(data);

    // Triggers opening page to register a method
    function handle2FAEnable() {
        redirect('/user/security/enable-mfa');
    }

    // TODO (later):
    function handle2FADisable() {
        setShowConfirm({ ...showConfirm, disable2FA: true });
        // When confirm, send to authProvider.disableMFA method
    }

    // TODO (later):
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
        data && (
            <UserSettingsPageWrapper title="Security Settings">
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
                                currentpwd
                                password
                                hideable
                                hideForm={() => setPasswordEdit(false)}
                                formRouting={changePasswordRouting}
                                successNotify="Password changed successfully"
                            />
                        )}
                    </UserSettingsSection>
                    <UserSettingsSection title="Two-Factor Authentication (2FA)">
                        {data.mfa.enabled ? (
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
                                                            methodNames[method]
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}>
                                        <Button
                                            onClick={handle2FAChangeDefault}
                                            sx={{ maxWidth: 'max-content' }}>
                                            Change default method
                                        </Button>
                                        <ConfirmAction
                                            message={`Change to ${
                                                methodNames[otherMethods[0]]
                                            }?`}
                                            visible={showConfirm.changeDefault}
                                            setNotVisible={() =>
                                                setShowConfirm({
                                                    ...showConfirm,
                                                    changeDefault: false,
                                                })
                                            }
                                        />
                                    </Box>
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
            </UserSettingsPageWrapper>
        )
    );
}

//
//
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

//
// {/* <UserForm
//     onSubmit={event =>
//         handleNewPasswordSubmit(event)
//     } spacing={1}
//     submitPending={passwordSubmitPending}
//     >
//     <UserFormPasswordSection
//         topField="currentpwd"
//     />
// </UserForm> */}
