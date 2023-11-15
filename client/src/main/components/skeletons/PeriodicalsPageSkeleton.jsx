'use client';
import { Box, Skeleton } from '@mui/material';
import PageWrapper from '@/main/components/layout/PageWrapper';
import DividerStyled from '../DividerStyled';

function SkeletonTextStandard() {
    return <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />;
}

export default function PeriodicalsPageSkeleton() {
    return (
        <PageWrapper>
            <Box
                sx={{
                    width: '100%',
                    flexShrink: 0,
                    mb: '2.75rem',
                    mt: '1.75rem',
                }}>
                <DividerStyled sx={{ mt: '.5rem', mb: '1rem', width: '85%' }} />

                <Skeleton variant="text" sx={{ fontSize: '2.5rem' }} />
                <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem', width: '200px' }}
                />
            </Box>
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
                                height: 385,
                                width: 280,
                                // flexShrink: 0,
                            }}
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ mb: '2rem' }}>
                            <SkeletonTextStandard />
                            <SkeletonTextStandard />
                            <SkeletonTextStandard />
                            <SkeletonTextStandard />
                            <SkeletonTextStandard />
                        </Box>
                        <Box sx={{ mb: '2rem' }}>
                            <SkeletonTextStandard />
                            <SkeletonTextStandard />
                            <SkeletonTextStandard />
                            <SkeletonTextStandard />
                            <SkeletonTextStandard />
                        </Box>
                        <SkeletonTextStandard />
                        <SkeletonTextStandard />
                    </Box>
                </Box>
                <Box sx={{ mb: '2rem' }}>
                    <SkeletonTextStandard />
                    <SkeletonTextStandard />
                    <SkeletonTextStandard />
                </Box>
                <Box sx={{ mb: '2rem' }}>
                    <SkeletonTextStandard />
                    <SkeletonTextStandard />
                    <SkeletonTextStandard />
                    <SkeletonTextStandard />
                </Box>
            </Box>
        </PageWrapper>
    );
}
