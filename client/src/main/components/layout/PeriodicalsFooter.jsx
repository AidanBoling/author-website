'use client';
import { Box } from '@mui/material';
import NewsletterFormPageComponent from '@/main/components/forms/NewsletterFormComponent';
import AboutAuthorMini from '@/main/components/AboutAuthorMini';
import DividerStyled from '@/main/components/DividerStyled';

export default function PeriodicalsFooter() {
    return (
        <Box width={'100%'} sx={{ display: 'inline-block' }}>
            <DividerStyled
                sx={{
                    width: '85%',
                    maxWidth: '800px',
                    mt: '3rem',
                    mb: '5rem',
                }}
            />
            <Box>
                <AboutAuthorMini />
                <NewsletterFormPageComponent />
            </Box>
        </Box>
    );
}
