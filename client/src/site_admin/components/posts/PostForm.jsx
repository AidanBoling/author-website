import { SimpleForm, TextInput, BooleanInput } from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-input-rich-text';
import { Grid, Box } from '@mui/material';
import CreateResourceTagsField from '../CreateResourceTagsField';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';
import FormImageField from '../ImageFieldArticlePostForm';

function PostForm({ newRecord }) {
    const tagsField = newRecord ? (
        <CreateResourceTagsField resource="posts" />
    ) : (
        <RecordTagsFieldLabel>
            <TagsListEdit resource="posts" />
        </RecordTagsFieldLabel>
    );

    return (
        <SimpleForm className="form">
            <Box className="form">
                <TextInput source="title" className="form" />
                <RichTextInput
                    source="content.richText"
                    editorOptions={DefaultEditorOptions}
                    className="form"
                    label="Content"
                />
                <TextInput
                    source="content.teaser"
                    multiline
                    rows={4}
                    className="form"
                    label="Teaser"
                    helperText="A paragraph which will show up on the post card view (in lists). Can simply copy the first paragraph of post."
                    fullWidth
                />
                <FormImageField newRecord={newRecord} />
                <Box sx={{ width: '50%' }}>{tagsField}</Box>
                <Box sx={{ mt: '2rem' }}>
                    <BooleanInput source="published" label="Publish" />
                </Box>
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
