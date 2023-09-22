'use client';
import { Box, Skeleton } from '@mui/material';
import PageWrapper from '@/main/components/PageWrapper';

export default function AboutPageSkeleton() {
    return (
        <PageWrapper header="About">
            <Box sx={{ my: '2rem' }}>
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
            </Box>
        </PageWrapper>
    );
}
