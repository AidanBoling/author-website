import {
    SimpleForm,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    DateTimeInput,
    required,
} from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-input-rich-text';
import { Grid } from '@mui/material';

function EventForm() {
    return (
        <SimpleForm>
            <TextInput source="title" className="form" validate={required()} />
            <Grid container spacing={2} className="form">
                <Grid item xs={12} sm={6}>
                    <DateTimeInput
                        source="date.start"
                        fullWidth
                        validate={required()}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DateTimeInput source="date.end" fullWidth />
                </Grid>
            </Grid>
            <RichTextInput
                source="details"
                editorOptions={DefaultEditorOptions}
                className="form"
                label="Other Details"
            />

            <ArrayInput
                source="actions"
                label="Important Event Links (buttons)"
                helperText="For any particularly important links that you want standing out — E.g. an event registration page, or a link to the event host's external event page.">
                <SimpleFormIterator inline>
                    <TextInput source="label" />
                    <TextInput source="link" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    );
}

export default EventForm;
