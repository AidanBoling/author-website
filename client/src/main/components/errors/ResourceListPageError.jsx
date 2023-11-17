'use client';
import PageWrapper from '@/main/components/layout/PageWrapper';
import { Typography, Button } from '@mui/material';

export default function ResourceListPageError({ resource, error, reset }) {
    console.log('Error message: ', error.message);

    return (
        <PageWrapper header={resource}>
            <Typography variant="h3" mb="2rem">
                Something went wrong!
            </Typography>
            <Typography>
                You can try reloading this resource list using the button below:
            </Typography>
            <Button variant="contained" onClick={() => reset()}>
                Try again
            </Button>
        </PageWrapper>
    );
}
