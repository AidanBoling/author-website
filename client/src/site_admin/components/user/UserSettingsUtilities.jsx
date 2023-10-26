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
} from '@mui/material';
import { Title, useGetIdentity, useAuthenticated } from 'react-admin';
import { redirect } from 'react-router-dom';

export default function UserSettingsPageWrapper(props) {
    const { isLoading, error } = useGetIdentity();

    // console.log('Identity info: ', data);
    useAuthenticated();

    const content = isLoading ? (
        <>Loading...</>
    ) : error ? (
        <>Error</>
    ) : (
        props.children
    );
    return (
        <Container maxWidth="xl">
            <Title title={props.title} />

            <Paper>
                <Box sx={{ padding: '2rem' }}>
                    <Stack gap={4}>{content}</Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export function UserSettingsSection(props) {
    return (
        <>
            <Box>
                <Typography variant="h5" component="h2" my=".5rem">
                    {props.title}
                </Typography>
                <Divider />
            </Box>
            <Box px={'2.5rem'} mb={'2rem'}>
                {props.children}
            </Box>
        </>
    );
}
