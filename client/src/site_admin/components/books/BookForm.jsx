'use client';
import {
    SimpleForm,
    TextInput,
    DateInput,
    SelectInput,
    ArrayInput,
    ReferenceInput,
    SimpleFormIterator,
} from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-input-rich-text';
import { Grid, Box } from '@mui/material';
import CreateResourceTagsField from '../CreateResourceTagsField';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

function BookForm({ newRecord }) {
    const tagsField = newRecord ? (
        <CreateResourceTagsField resource="books" />
    ) : (
        <RecordTagsFieldLabel>
            <TagsListEdit resource="books" />
        </RecordTagsFieldLabel>
    );

    return (
        <SimpleForm>
            <Box className="form">
                <TextInput source="title" fullWidth />
                <RichTextInput
                    source="description.long"
                    editorOptions={DefaultEditorOptions}
                    fullWidth
                    label="Description"
                />
                <TextInput
                    source="description.short"
                    multiline
                    rows={4}
                    className="form"
                    label="Teaser"
                    fullWidth
                />
                <Box sx={{ width: '49%' }}>
                    <ReferenceInput reference="images" source="coverImage">
                        <SelectInput
                            optionText="title"
                            label="Cover Image"
                            fullWidth
                        />
                    </ReferenceInput>
                    <TextInput
                        source="coverImagePlaceholder"
                        label="Cover Image Placeholder URL"
                        fullWidth
                    />
                </Box>

                <Grid container spacing={2}>
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

                <ArrayInput source="purchaseInfo">
                    <SimpleFormIterator inline>
                        <TextInput source="location" helperText={false} />
                        <TextInput source="link" helperText={false} />
                    </SimpleFormIterator>
                </ArrayInput>
                <Box sx={{ width: '50%' }}>{tagsField}</Box>
            </Box>
        </SimpleForm>
    );
}

export default BookForm;
