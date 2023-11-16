import { TabbedForm, TextInput, DateInput } from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-input-rich-text';
import { Grid, Box } from '@mui/material';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';
import CreateResourceTagsField from '../CreateResourceTagsField';
import FormImageField from '../ImageFieldArticlePostForm';

function ArticleForm({ newRecord }) {
    const tagsField = newRecord ? (
        <CreateResourceTagsField resource="articles" />
    ) : (
        <RecordTagsFieldLabel>
            <TagsListEdit resource="articles" />
        </RecordTagsFieldLabel>
    );

    return (
        <TabbedForm>
            <TabbedForm.Tab label="Main">
                <Box className="form">
                    <TextInput source="title" fullWidth />
                    <TextInput
                        source="url"
                        className="form"
                        label="Link to Article"
                    />
                    <FormImageField newRecord={newRecord} />
                    <TextInput
                        source="descriptionShort"
                        multiline
                        rows={4}
                        className="form input-outlined"
                        label="Teaser"
                        InputProps={{
                            sx: { border: '2px solid lightgrey' },
                        }}
                    />

                    <DateInput source="datePublished" />
                    <Grid container spacing={2} className="form">
                        <Grid item xs={12} sm={6}>
                            <TextInput source="publisher.name" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextInput source="publisher.website" fullWidth />
                        </Grid>
                    </Grid>
                    <Box sx={{ width: '50%' }}>{tagsField}</Box>
                </Box>
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Content">
                <RichTextInput
                    source="content"
                    editorOptions={DefaultEditorOptions}
                    className="form"
                    label={false}
                />
            </TabbedForm.Tab>
        </TabbedForm>
    );
}

export default ArticleForm;
