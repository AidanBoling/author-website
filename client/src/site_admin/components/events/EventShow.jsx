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
} from 'react-admin';
import { Box } from '@mui/material';
import PageTitle from '../PageTitle';

function EventShow() {
    const record = useRecordContext();
    let isSameDay = true;

    if (
        record &&
        record.date.start.slice(0, 11) !== record.date.end.slice(0, 11)
    ) {
        isSameDay = false;
    }

    return (
        <Show title={<PageTitle resourceName="Event" />}>
            <SimpleShowLayout>
                {/* <ImageField source="coverImageUrl" /> */}
                <TextField source="title" label={false} />
                {isSameDay ? (
                    <WrapperField label="Date & Time">
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
                    </WrapperField>
                ) : (
                    <WrapperField label="Date(s)">
                        <Box>
                            <DateField
                                source="date.start"
                                sx={{ mr: '1rem' }}
                            />
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
                    </WrapperField>
                )}

                <RichTextField source="details" />
            </SimpleShowLayout>
        </Show>
    );
}

export default EventShow;
