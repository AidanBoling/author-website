import {
    Datagrid,
    List,
    TextField,
    TextInput,
    EditButton,
    DateField,
    WrapperField,
    useRecordContext,
} from 'react-admin';
import { Typography } from '@mui/material';

const eventFilters = [<TextInput label="Search" source="q" alwaysOn />];

function EventList() {
    return (
        <List filters={eventFilters}>
            <Datagrid rowClick="show">
                <TextField source="title" />

                <WrapperField
                    label="Date"
                    sortBy="date.start"
                    style={{
                        display: 'flex',
                        minWidth: '150px',
                    }}>
                    <Typography>
                        <DateField
                            source="date.start"
                            showTime
                            options={{
                                timeStyle: 'short',
                                dateStyle: 'medium',
                            }}
                        />{' '}
                        — <ConditionalDateEndField source="date.end" />
                    </Typography>
                </WrapperField>
                <EditButton />
            </Datagrid>
        </List>
    );
}

function compareDates(start, end) {
    const dateStart = new Date(start).getDate();
    const dateEnd = new Date(end).getDate();

    let datesAreEqual = true;
    if (dateStart > dateEnd || dateStart < dateEnd) {
        datesAreEqual = false;
    }
    return datesAreEqual;
}

function ConditionalDateEndField({ source }) {
    const record = useRecordContext();
    return record && compareDates(record[source], record.date.start) ? (
        <DateField
            source={source}
            showDate={false}
            showTime
            options={{
                timeStyle: 'short',
            }}
        />
    ) : (
        <DateField
            source={source}
            showTime
            options={{
                timeStyle: 'short',
                dateStyle: 'medium',
            }}
        />
    );
}

export default EventList;
