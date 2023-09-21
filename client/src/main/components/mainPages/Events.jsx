'use client';
import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { getList } from '@/main/api/getResourceItems';
import EventCard from '../cards/EventCard';
import ResourceCardSkeleton from '../cards/ResourceCardSkeleton';

function Events(props) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const allItems = await getList('events');
            console.log(allItems);
            setEvents(allItems);
            // return publishedPosts;
        }
        fetchItems();
    }, []);

    return (
        <Box>
            <Box sx={{ my: '2rem' }}>
                <Typography paragraph>Lorem ipsum dolor sit amet...</Typography>
            </Box>
            <Typography variant="h3" component="h3" mb="1.5rem" color="primary">
                Upcoming Events
            </Typography>
            <Stack spacing={3}>
                {events.length > 0 ? (
                    events.map(event => (
                        <EventCard key={event._id} event={event} />
                    ))
                ) : (
                    <ResourceCardSkeleton hasMedia={true} />
                )}
            </Stack>
        </Box>
    );
}

export default Events;
