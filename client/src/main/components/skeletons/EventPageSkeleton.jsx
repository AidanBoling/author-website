'use client';
import { Box, Stack, Skeleton } from '@mui/material';
import PageWrapper from '@/main/components/layout/PageWrapper';
import EventCardSkeleton from '@/main/components/skeletons/EventCardSkeleton';

export default function EventPageHeaderSkeleton() {
    return (
        <PageWrapper header="Speaking & Consultations">
            <Box sx={{ my: '2rem' }}>
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
            </Box>
            <Skeleton
                variant="text"
                sx={{
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem',
                }}
            />
            <EventListSkeleton />
        </PageWrapper>
    );
}

export function EventListSkeleton() {
    return (
        <Stack spacing={3}>
            <EventCardSkeleton />
            <EventCardSkeleton />
        </Stack>
    );
}
