import {
    Show,
    SimpleShowLayout,
    TextField,
    RichTextField,
    DateField,
    // ImageField,
    // UrlField,
    useRecordContext,
    WrapperField,
    WithRecord,
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import PageTitle from '../PageTitle';

function EventShow() {
    const record = useRecordContext();

    return (
        <Show title={<PageTitle resourceName="Event" />}>
            <WithRecord
                label={false}
                render={record => (
                    <Typography variant="h4" component="h2" mb="1rem" ml="1rem">
                        {record.title}
                    </Typography>
                )}
            />
            <SimpleShowLayout spacing={3}>
                <WrapperField label="Date & Time">
                    <DateTimeField />
                </WrapperField>
                {record && record.location && <TextField source="location" />}
                <RichTextField source="details" />
            </SimpleShowLayout>
        </Show>
    );
}

function DateTimeField() {
    const record = useRecordContext();
    let isSameDay = true;

    if (
        record &&
        record.date.start.slice(0, 11) !== record.date.end.slice(0, 11)
    ) {
        isSameDay = false;
    }

    if (!record) return null;
    return isSameDay ? (
        <>
            <DateField source="date.start" />
            <Box>
                <DateField
                    source="date.start"
                    showDate={false}
                    showTime
                    options={{
                        timeStyle: 'short',
                    }}
                    sx={{ mr: '.5rem' }}
                />
                —
                <DateField
                    source="date.end"
                    showDate={false}
                    showTime
                    options={{
                        timeStyle: 'short',
                    }}
                    sx={{ ml: '.5rem' }}
                />
            </Box>
        </>
    ) : (
        <>
            <Box>
                <DateField source="date.start" sx={{ mr: '1rem' }} />
                <DateField
                    source="date.start"
                    showDate={false}
                    showTime
                    locale="en-US"
                    options={{
                        timeStyle: 'short',
                    }}
                />
            </Box>
            <Box>
                <DateField source="date.end" sx={{ mr: '1rem' }} />
                <DateField
                    source="date.end"
                    showDate={false}
                    showTime
                    options={{
                        timeStyle: 'short',
                    }}
                />
            </Box>
        </>
    );
}

export default EventShow;
