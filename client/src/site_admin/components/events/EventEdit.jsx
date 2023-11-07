import { Edit } from 'react-admin';
import PageTitle from '../PageTitle';
import EventForm from './EventForm';

function EventEdit() {
    return (
        <Edit title={<PageTitle resourceName="Event" />} redirect="show">
            <EventForm />
        </Edit>
    );
}

export default EventEdit;
