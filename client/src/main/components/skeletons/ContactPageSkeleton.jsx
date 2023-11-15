'use client';
import { Box, Paper, Skeleton } from '@mui/material';
import PageWrapper from '@/main/components/layout/PageWrapper';
import ContactFormSkeleton from '@/main/components/skeletons/ContactFormSkeleton';

export default function ContactPageSkeleton() {
    return (
        <PageWrapper header="Contact">
            <Box sx={{ my: '2rem' }}>
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
            </Box>
            <Paper sx={{ p: '2rem' }}>
                <ContactFormSkeleton />
            </Paper>
        </PageWrapper>
    );
}
