'use client';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function AboutAuthorMini() {
    const theme = useTheme();
    const isXS = useMediaQuery(theme.breakpoints.down('sm'));
    const spacing = '2rem';
    const breakpoint = 'sm';
    // const authorAvatar = <Image />;

    const authorName = (
        <Typography
            component="p"
            variant="h5"
            sx={{
                ml: { xs: spacing, [breakpoint]: 0 },
                display: 'flex',
                alignItems: 'center',
            }}>
            <i>Jane Austen</i>
        </Typography>
    );

    const authorDescription = (
        <Typography sx={{ mt: '1rem' }}>
            A description about the author, interdum et malesuada fames ac ante
            ipsum primis in faucibus. Nulla tempor lectus sed nunc laoreet
            euismod. Pellentesque viverra ligula ac neque congue tristique.
        </Typography>
    );

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', [breakpoint]: 'row' },
                p: '1rem',
                my: '2rem',
            }}>
            <Box
                sx={{
                    display: { xs: 'flex', [breakpoint]: 'inline' },
                    justifyContent: {
                        xs: 'flex-start',
                        [breakpoint]: 'flex-start',
                    },
                }}>
                <Image
                    src="https://picsum.photos/200/200?random=1"
                    alt="image of the author"
                    height={120}
                    width={120}
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
