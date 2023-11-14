'use client';
import { Paper, Stack, Typography } from '@mui/material';
import SubscribeForm from './SubscribeForm';
import pageContent from '@/main/content/formsContent.json';

export default function NewsletterForm() {
    const breakpoint = 'md';

    return (
        <Paper
            sx={{
                p: '2rem',
                display: 'flex',
                flexDirection: { xs: 'column', [breakpoint]: 'row' },
            }}>
            <Stack
                gap={2}
                sx={{
                    maxWidth: { [breakpoint]: '50%' },
                    mr: { xs: 0, [breakpoint]: '2rem' },
                }}>
                <Typography variant="h6" component="p" color="primary.main">
                    Subscribe to my monthly newsletter!
                </Typography>
                <Typography sx={{ mb: '2rem' }}>
                    {pageContent.subscribe.description}
                </Typography>
            </Stack>
            <SubscribeForm buttonSize={'medium'} />
        </Paper>
    );
}
