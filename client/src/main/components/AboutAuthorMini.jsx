'use client';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function AboutAuthorMini() {
    const theme = useTheme();
    const isXS = useMediaQuery(theme.breakpoints.down('sm'));
    const spacing = '2rem';
    // const authorAvatar = <Image />;

    const authorName = (
        <Typography component="p" variant="h5">
            <i>Jane Austen</i>
        </Typography>
    );

    const authorDescription = (
        <Typography sx={{ ml: { xs: spacing, sm: 0 }, mt: '1.2rem' }}>
            A description about the author...
        </Typography>
    );

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                my: '4rem',
            }}>
            <Box
                sx={{
                    display: 'inline',
                }}>
                <Image
                    src="https://picsum.photos/200/200?random=1"
                    alt="image of the author"
                    height={100}
                    width={100}
                    style={{
                        objectFit: 'cover',
                        borderRadius: '50%',
                    }}
                />
                {isXS && authorName}
            </Box>
            <Box sx={{ ml: { sm: spacing }, mt: { xs: spacing, sm: 0 } }}>
                {!isXS && authorName}
                {authorDescription}
            </Box>
        </Box>
    );
}
