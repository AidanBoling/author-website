'use client';
import PageWrapper from '@/main/components/layout/PageWrapper';
import { Typography, Button } from '@mui/material';

export default function ResourceItemPageError({ error, reset }) {
    console.log('Error message: ', error.message);

    return (
        <PageWrapper>
            <Typography variant="h2" mb="2rem">
                Something went wrong!
            </Typography>
            <Typography>
                Try loading this resource again using the button below, or click
                the back button in your browser to leave this page.
            </Typography>
            <Button variant="contained" onClick={() => reset()}>
                Try again
            </Button>
        </PageWrapper>
    );
}
