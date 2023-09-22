'use client';
import { Stack, Typography } from '@mui/material';
import EventCard from './cards/EventCard';
import NoItemsMessage from './NoItemsMessage';

export default function EventsList(props) {
    return (
        <>
            {props.events.length > 0 ? (
                props.events.map(event => (
                    <EventCard key={event._id} event={event} />
                ))
            ) : (
                <NoItemsMessage message={'No events found.'} />
            )}
        </>
    );
}
