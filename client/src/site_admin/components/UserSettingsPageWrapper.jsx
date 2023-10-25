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
