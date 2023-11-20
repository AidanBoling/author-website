'use client';
import Image from 'next/image';
import { Box, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import pageContent from '@/main/content/authorDetails.json';

export default function AboutAuthorMini() {
    const theme = useTheme();
    const isXS = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('lg'));
    const spacing = '2rem';
    const breakpoint = 'sm';

    const imageWidth = isXS ? 120 : isMd ? 150 : 140;
    const imageHeight = imageWidth;

    const authorName = (
        <Box
            sx={{
                ml: { xs: spacing, [breakpoint]: 0 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                mb: { [breakpoint]: '.5rem' },
            }}>
            <Typography component="p" variant="h5" sx={{ mb: '.5rem' }}>
                <i>About the Author</i>
            </Typography>
            <Divider sx={{ width: { xs: '100%', sm: '70%' } }} />
        </Box>
    );

    const authorDescription = (
        <Typography sx={{ mt: '1rem' }}>
            {pageContent.author.summary}
        </Typography>
    );

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', [breakpoint]: 'row' },
                p: '1rem',
                pl: { [breakpoint]: 0 },
                my: '2rem',
            }}>
            <Box
                sx={{
                    display: { xs: 'flex', [breakpoint]: 'flex' },
                    justifyContent: {
                        xs: 'flex-start',
                        [breakpoint]: 'flex-start',
                    },
                    alignItems: 'center',
                }}>
                <Image
                    src={pageContent.author.avatarURL}
                    alt="image of the author"
                    width={imageWidth}
                    height={imageHeight}
                    style={{
                        objectFit: 'cover',
                        borderRadius: '50%',
                    }}
                />
                {isXS && authorName}
            </Box>
            <Box
                sx={{
                    ml: { xs: 0, [breakpoint]: spacing },
                    mt: { xs: '1rem', [breakpoint]: 0 },
                }}>
                {!isXS && authorName}
                {authorDescription}
            </Box>
        </Box>
    );
}
