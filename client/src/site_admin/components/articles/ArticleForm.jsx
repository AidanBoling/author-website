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
    Labeled,
} from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-input-rich-text';
import { Grid } from '@mui/material';
import TagsListEdit from '../TagsListEdit';

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
                    source="image.url"
                    className="form"
                    label="Image URL"
                />
                <TextInput
                    source="image.altText"
                    className="form"
                    label="Image Description (accessibility)"
                />
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
                <Labeled
                    label="Tags"
                    sx={{
                        fontSize: '1.25rem',
                        pl: '.5rem',
                    }}>
                    <TagsListEdit resource="articles" />
                </Labeled>
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
