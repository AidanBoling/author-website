import { SimpleForm, TextInput, BooleanInput } from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-input-rich-text';
import { Grid, Box } from '@mui/material';
import CreateResourceTagsField from '../CreateResourceTagsField';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

function PostForm({ newRecord }) {
    const tagsField = newRecord ? (
        <CreateResourceTagsField resource="posts" />
    ) : (
        <RecordTagsFieldLabel>
            <TagsListEdit resource="posts" />
        </RecordTagsFieldLabel>
    );

    return (
        <SimpleForm>
            <TextInput source="title" className="form" />
            <RichTextInput
                source="content.richText"
                editorOptions={DefaultEditorOptions}
                className="form"
                label="Content"
            />

            <Grid container spacing={2} className="form">
                <Grid item xs={12} sm={6}>
                    <TextInput
                        source="image.url"
                        label="Cover Image URL"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextInput
                        source="image.altText"
                        label="Image Description (accessibility)"
                        fullWidth
                    />
                </Grid>
            </Grid>
            {tagsField}
            <Box sx={{ mt: '2rem' }}>
                <BooleanInput source="published" label="Publish" />
            </Box>
        </SimpleForm>
    );
}

export default PostForm;

// <SimpleForm>
//     <TextInput source="title" />
//     <RichTextInput source="content" multiline rows={5} />
//     <RecordTagsFieldLabel>
//         <TagsListEdit resource="posts" />
//     </RecordTagsFieldLabel>
//     {/* <TextInput source="body" multiline rows={5} /> */}
// </SimpleForm> */}
