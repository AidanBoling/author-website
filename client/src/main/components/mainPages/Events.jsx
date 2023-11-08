'use client';
import { Box, Stack, Typography } from '@mui/material';
import pageContent from '../../content/eventsContent.json';

function Events({ children }) {
    return (
        <>
            <Box sx={{ my: '2rem' }}>
                {pageContent.headerText.map((paragraph, i) => (
                    <Typography key={i} mb={'2rem'}>
                        {paragraph}
                    </Typography>
                ))}
                {/* <Typography paragraph>{pageContent.headerText}</Typography> */}
            </Box>
            <Typography variant="h3" component="h3" mb="1.5rem" color="primary">
                Upcoming Events
            </Typography>
            <Stack spacing={3}>{children}</Stack>
        </>
    );
}

export default Events;
