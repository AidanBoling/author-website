import {
    ReferenceInput,
    SimpleForm,
    TextInput,
    ImageInput,
    DateInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
} from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-input-rich-text';
import { Grid } from '@mui/material';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

function BookForm() {
    return (
        <SimpleForm>
            <TextInput source="title" className="form" />
            <RichTextInput
                source="description.long"
                editorOptions={DefaultEditorOptions}
                className="form"
                label="Description"
            />
            <TextInput
                source="description.short"
                multiline
                rows={4}
                className="form"
                label="Teaser"
            />
            <TextInput
                source="coverImage"
                className="form"
                label="Cover Image URL"
            />
            <Grid container spacing={2} className="form">
                <Grid item xs={12} sm={6}>
                    <DateInput source="datePublished" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectInput
                        source="category"
                        choices={[
                            { id: 'fiction', name: 'Fiction' },
                            { id: 'non-fiction', name: 'Non-Fiction' },
                        ]}
                        fullWidth
                    />
                </Grid>
            </Grid>

            {/* <ImageInput source="coverImageUrl" className="form" /> */}
            <ArrayInput source="purchaseInfo">
                <SimpleFormIterator inline>
                    <TextInput source="location" helperText={false} />
                    <TextInput source="link" helperText={false} />
                </SimpleFormIterator>
            </ArrayInput>
            <RecordTagsFieldLabel>
                <TagsListEdit resource="books" />
            </RecordTagsFieldLabel>
        </SimpleForm>
    );
}

export default BookForm;
