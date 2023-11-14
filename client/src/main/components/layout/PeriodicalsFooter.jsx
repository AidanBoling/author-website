'use client';
import { Box } from '@mui/material';
import NewsletterForm from '@/main/components/forms/NewsletterForm';
import AboutAuthorMini from '@/main/components/AboutAuthorMini';
import DividerStyled from '@/main/components/DividerStyled';

export default function PeriodicalsFooter(props) {
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
                <NewsletterForm />
            </Box>
        </Box>
    );
}
