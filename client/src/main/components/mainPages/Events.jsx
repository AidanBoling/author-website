'use client';
import { Box, Stack, Typography } from '@mui/material';

function Events({ children }) {
    return (
        <>
            <Box sx={{ my: '2rem' }}>
                <Typography paragraph>Lorem ipsum dolor sit amet...</Typography>
            </Box>
            <Typography variant="h3" component="h3" mb="1.5rem" color="primary">
                Upcoming Events
            </Typography>
            <Stack spacing={3}>{children}</Stack>
        </>
    );
}

export default Events;
