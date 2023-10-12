'use client';
import {
    Container,
    Paper,
    Box,
    Stack,
    Divider,
    Typography,
} from '@mui/material';
import { Title } from 'react-admin';

export default function SecuritySettings() {
    return (
        <Container maxWidth="xl">
            <Title title="Security Settings" />

            <Paper>
                <Box sx={{ padding: '2rem' }}>
                    <Stack gap={4}>
                        <Stack gap={2}>
                            <Box>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    my=".5rem">
                                    Password
                                </Typography>
                                <Divider />
                            </Box>
                            <Box>Change Password</Box>
                        </Stack>

                        <Stack gap={2}>
                            <Box>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    my=".5rem">
                                    2FA
                                </Typography>
                                <Divider />
                            </Box>

                            <Box>Set up 2FA</Box>
                            <Box>Add 2FA method</Box>
                            <Button>Enable/Disable 2FA</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}
