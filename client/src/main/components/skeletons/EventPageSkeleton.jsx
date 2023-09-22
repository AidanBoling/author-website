'use client';
// import { useState } from 'react';

import { Box, Stack, Skeleton } from '@mui/material';
import PageWrapper from '@/main/components/PageWrapper';

import ResourceCardSkeleton from '@/main/components/cards/ResourceCardSkeleton';

export default function EventPageHeaderSkeleton() {
    return (
        <PageWrapper header="Events">
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
            <Stack spacing={3}>
                <ResourceCardSkeleton hasMedia />
            </Stack>
        </PageWrapper>
    );
}

// export function EventListSkeleton() {
//     return (
//         <Stack spacing={3}>
//             <ResourceCardSkeleton hasMedia />
//             <ResourceCardSkeleton hasMedia />
//         </Stack>
//     );
// }

// export default EventPageSkeleton;
