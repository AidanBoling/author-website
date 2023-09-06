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

            <DateInput source="datePublished" />
            <SelectInput
                source="category"
                choices={[
                    { id: 'fiction', name: 'Fiction' },
                    { id: 'non-fiction', name: 'Non-Fiction' },
                ]}
            />
            <TextInput
                source="coverImageUrl"
                className="form"
                label="Cover Image URL"
            />
            {/* <ImageInput source="coverImageUrl" className="form" /> */}

            <ArrayInput source="purchaseInfo">
                <SimpleFormIterator inline>
                    <TextInput source="location" helperText={false} />
                    <TextInput source="link" helperText={false} />
                </SimpleFormIterator>
            </ArrayInput>
            {/* <ReferenceInput source="tagId" reference="tags" /> */}
        </SimpleForm>
    );
}

export default BookForm;
