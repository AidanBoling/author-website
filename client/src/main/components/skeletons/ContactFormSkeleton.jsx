'use client';
import { Box, Skeleton } from '@mui/material';

export default function ContactFormSkeleton() {
    return (
        <Box sx={{ my: '.75rem' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    mb: '2rem',
                }}>
                <Skeleton
                    variant="rounded"
                    sx={{
                        width: '100%',
                        height: '2.5rem',
                        mr: '.75rem',
                    }}
                />
                <Skeleton
                    variant="rounded"
                    sx={{
                        width: '100%',
                        height: '2.5rem',
                        ml: '.75rem',
                    }}
                />
            </Box>
            <Skeleton
                variant="rounded"
                sx={{ height: '12rem', mb: '2.5rem' }}
            />
            <Skeleton
                variant="rounded"
                sx={{
                    width: '180px',
                    height: '50px',
                    ml: 'auto',
                }}
            />
        </Box>
    );
}
