'use client';
import { ErrorBoundary } from 'react-error-boundary';
import ItemsListError from '@/main/components/errors/ItemsListError';
import { Box, Stack, Typography } from '@mui/material';
import pageContent from '../../content/eventsContent.json';

function Events({ children }) {
    return (
        <>
            <Box sx={{ mt: '2rem', mb: '3rem' }}>
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
            <Stack spacing={3}>
                <ErrorBoundary fallback={<ItemsListError />}>
                    {children}
                </ErrorBoundary>
            </Stack>
        </>
    );
}

export default Events;
