import EventCard from '../cards/EventCard';
import NoItemsMessage from '../NoItemsMessage';
import { getList } from '@/main/api/getResourceItems';

export default async function EventsList() {
    const events = await getList('events');

    return events.length > 0 ? (
        events.map(event => <EventCard key={event._id} event={event} />)
    ) : (
        <NoItemsMessage message={'No events found.'} />
    );
}
