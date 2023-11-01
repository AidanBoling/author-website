'use client';
import PageWrapper from '@/main/components/PageWrapper';
import { Typography } from '@mui/material';

export default function NotFound() {
    return (
        <PageWrapper>
            <Typography variant="h1" component="h2">
                404: Not Found
            </Typography>
            <p>Could not find requested resource</p>
        </PageWrapper>
    );
}
