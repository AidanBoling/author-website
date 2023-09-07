import {
    ReferenceInput,
    TabbedForm,
    TextInput,
    ImageInput,
    DateInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    FormGroupContextProvider,
} from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-input-rich-text';
import { CompactForm, RaBox } from 'ra-compact-ui';
import { Grid } from '@mui/material';

function ArticleForm() {
    return (
        <TabbedForm>
            <TabbedForm.Tab label="Main">
                <TextInput source="title" className="form" />
                <TextInput
                    source="url"
                    className="form"
                    label="Link to Article"
                />
                <TextInput
                    source="imageUrl"
                    className="form"
                    label="Image URL"
                />
                <TextInput
                    source="descriptionShort"
                    multiline
                    rows={4}
                    className="form"
                    label="Teaser"
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
                {/* <ReferenceInput source="tagId" reference="tags" /> */}
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
