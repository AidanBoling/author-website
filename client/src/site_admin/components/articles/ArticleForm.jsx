import {
    TabbedForm,
    TextInput,
    // ImageInput,
    DateInput,
    // SelectInput,
} from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-input-rich-text';
import { Grid } from '@mui/material';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';
import CreateResourceTagsField from '../CreateResourceTagsField';

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
                <TextInput source="title" className="form" />
                <TextInput
                    source="url"
                    className="form"
                    label="Link to Article"
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

                {/* <SelectInput
                source="category"
                choices={[
                    { id: 'fiction', name: 'Fiction' },
                    { id: 'non-fiction', name: 'Non-Fiction' },
                ]}
            /> */}

                {/* <ImageInput source="coverImageUrl" className="form" /> */}
                <Grid container spacing={2} className="form">
                    <Grid item xs={12} sm={6}>
                        <TextInput source="publisher.name" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInput source="publisher.website" fullWidth />
                    </Grid>
                </Grid>
                {tagsField}
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
