'use client';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import pageContent from '@/main/content/authorDetails.json';

export default function AboutAuthorMini() {
    const theme = useTheme();
    const isXS = useMediaQuery(theme.breakpoints.down('sm'));
    const spacing = '2rem';
    const breakpoint = 'sm';

    const authorName = (
        <Typography
            component="p"
            variant="h5"
            sx={{
                ml: { xs: spacing, [breakpoint]: 0 },
                display: 'flex',
                alignItems: 'center',
            }}>
            <i>{pageContent.author.name}</i>
        </Typography>
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
                    display: { xs: 'flex', [breakpoint]: 'inline' },
                    justifyContent: {
                        xs: 'flex-start',
                        [breakpoint]: 'flex-start',
                    },
                }}>
                <Image
                    src={pageContent.author.avatarURL}
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
