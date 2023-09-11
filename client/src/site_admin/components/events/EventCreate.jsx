import { Create } from 'react-admin';
import EventForm from './EventForm';

function EventCreate() {
    return (
        <Create redirect="show">
            <EventForm />
        </Create>
    );
}

export default EventCreate;

// TODO
// Make sure if published=true, also sends the current date as publishDate...
