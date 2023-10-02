'use client';
import { Paper, Stack, Typography } from '@mui/material';
import SubscribeForm from './SubscribeForm';

export default function NewsletterForm() {
    return (
        <>
            <Paper
                sx={{
                    p: '2rem',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                }}>
                <Stack gap={2} sx={{ minWidth: '50%' }}>
                    <Typography variant="h6" component="p" color="primary.main">
                        Subscribe to my monthly newsletter!
                    </Typography>
                    <Typography sx={{ mb: '2rem' }}>
                        A newsletter where vestibulum a mi sit amet sem mollis
                        euismod eget quis mi. Sed quis fermentum tortor. Nullam
                        aliquet viverra lorem. Sed eu vehicula purus, vel rutrum
                        nunc.
                    </Typography>
                </Stack>
                <SubscribeForm buttonSize={'medium'} />
            </Paper>
        </>
    );
}
