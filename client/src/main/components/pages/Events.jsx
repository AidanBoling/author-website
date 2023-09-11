import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { getList } from '../../api/getResourceItems';
import PageTitle from '../PageTitle';
import EventCard from '../EventCard';
import ResourceCardSkeleton from '../ResourceCardSkeleton';

function Events() {
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
        <div>
            <div className="main">
                <PageTitle title="Events" />

                <div className="content">
                    <Box sx={{ my: '2rem' }}>
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet...
                        </Typography>
                    </Box>
                    <Typography variant="h4" component="h2" mb="1.5rem">
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
                </div>
            </div>
        </div>
    );
}

export default Events;
