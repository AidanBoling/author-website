'use client';
import { Box, Skeleton } from '@mui/material';
import PageWrapper from '@/main/components/layout/PageWrapper';

export default function ContactPageSkeleton() {
    return (
        <PageWrapper header="Contact">
            <Box sx={{ my: '2rem' }}>
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
            </Box>
        </PageWrapper>
    );
}
