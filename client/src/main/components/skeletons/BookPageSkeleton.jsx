'use client';
import { Box, Skeleton } from '@mui/material';
import PageWrapper from '@/main/components/layout/PageWrapper';

function SkeletonTextStandard() {
    return <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />;
}

export default function BookPageSkeleton() {
    const Header = () => (
        <Box sx={{ width: '100%' }}>
            <Skeleton variant="text" sx={{ fontSize: '2.75rem' }} />
            <Skeleton
                variant="text"
                sx={{ fontSize: '1.7rem', mt: '0', mb: '2rem' }}
            />
        </Box>
    );

    const Buttons = () => (
        <Box>
            <Skeleton
                variant="rounded"
                sx={{
                    height: 40,
                    width: 170,
                    mt: '2rem',
                    // flexShrink: 0,
                }}
            />
        </Box>
    );

    return (
        <PageWrapper>
            <Box
                sx={{
                    width: '100%',
                    flexShrink: 0,
                    mb: '2.75rem',
                    mt: '1.75rem',
                }}></Box>
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
                                height: { xs: 500, md: 400 },
                                width: { xs: 400, md: 300 },
                            }}
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Header />
                        <Box sx={{ mb: '2rem' }}>
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
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ mb: '2rem' }}>
                    <SkeletonTextStandard />
                    <SkeletonTextStandard />
                </Box>
                <Buttons />
            </Box>
        </PageWrapper>
    );
}
