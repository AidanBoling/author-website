'use client';
import { Box, Skeleton } from '@mui/material';
import PageWrapper from '@/main/components/layout/PageWrapper';

export default function AboutPageSkeleton() {
    return (
        <PageWrapper header="About">
            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                    }}>
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'inline block' },
                            justifyContent: {
                                xs: 'center',
                                md: 'flex-start',
                            },
                            // float: { xs: 'unset', sm: 'left' },
                            p: '2rem',
                            pt: '.5rem',
                            pl: { md: 0 },
                            width: { xs: '100%', md: 'min-content' },

                            shapeOutside: 'margin-box',
                        }}>
                        <Skeleton
                            variant="rounded"
                            sx={{
                                height: 335,
                                width: 290,
                                // flexShrink: 0,
                            }}
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ mb: '2rem' }}>
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.25rem' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.25rem' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.25rem' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.25rem' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.25rem' }}
                            />
                        </Box>
                        <Box sx={{ mb: '2rem' }}>
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.25rem' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.25rem' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.25rem' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.25rem' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.25rem' }}
                            />
                        </Box>
                        <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                    </Box>
                </Box>
                <Box sx={{ mb: '2rem' }}>
                    <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                </Box>
            </Box>
        </PageWrapper>
    );
}
