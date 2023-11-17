'use client';
import PageWrapper from '@/main/components/layout/PageWrapper';
import { Typography } from '@mui/material';

export default function ItemsListError() {
    console.log('There was an error loading the resource list.');

    return (
        <PageWrapper>
            <Typography variant="h3" my="2rem">
                Something went wrong!
            </Typography>
            <Typography>
                Try refreshing this page, or click the back button in your
                browser to leave this page.
            </Typography>
        </PageWrapper>
    );
}
