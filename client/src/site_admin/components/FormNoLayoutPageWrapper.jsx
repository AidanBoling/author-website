import * as React from 'react';
import {
    Container,
    Paper,
    Box,
    Stack,
    Typography,
    Divider,
} from '@mui/material';

export default function FormPageWrapper(props) {
    return (
        <Container
            className="login"
            maxWidth={'xl'}
            sx={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: props.width,
                    mt: '10vh',
                }}>
                <Stack gap={props.spacing || 3}>
                    {props.title && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                mt={'1.25rem'}
                                mb={'1rem'}>
                                {props.title}
                            </Typography>
                            <Divider width={'80%'} />
                        </Box>
                    )}
                    {props.children}
                </Stack>
            </Paper>
        </Container>
    );
}
