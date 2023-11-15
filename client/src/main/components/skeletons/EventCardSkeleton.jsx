'use client';
// import { useState } from 'react';
import { Box, Card, Skeleton } from '@mui/material';

function EventCardSkeleton() {
    return (
        <Card
            className={`card wide skeleton resource-card`}
            sx={{
                display: 'flex',
                width: '100%',
                padding: '1rem',
            }}>
            <Box>
                <Skeleton
                    variant="rounded"
                    sx={{
                        height: 80,
                        width: 80,
                        mr: '1rem',
                        flexShrink: 0,
                        m: '1.5rem',
                    }}
                />
            </Box>
            <Box className="resource-card content" width={'100%'}>
                <Skeleton
                    variant="text"
                    sx={{
                        fontSize: '2.5rem',
                        marginBottom: '1.5rem',
                    }}
                />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton
                    variant="rounded"
                    width={100}
                    sx={{ fontSize: '1.75rem', marginTop: '1rem' }}
                />
            </Box>
        </Card>
    );
}

export default EventCardSkeleton;
