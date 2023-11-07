import { SimpleForm, TextInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

function PostForm() {
    return (
        <SimpleForm>
            {/* <TextInput source="id" disabled /> */}
            {/* <ReferenceInput source="userId" reference="users" /> */}
            <TextInput source="title" />
            <RichTextInput source="content" multiline rows={5} />
            <RecordTagsFieldLabel>
                <TagsListEdit resource="posts" />
            </RecordTagsFieldLabel>
            {/* <TextInput source="body" multiline rows={5} /> */}
        </SimpleForm>
    );
}

export default PostForm;
