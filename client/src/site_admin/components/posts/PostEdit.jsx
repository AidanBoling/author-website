import { Edit, ReferenceInput, SimpleForm, TextInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import PostForm from './PostForm';
import PostTitle from './PostPageTitle';
import PostEditDraftElement from './PostEditDraftElement';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

function PostEdit() {
    return (
        <Edit title={<PostTitle />}>
            <SimpleForm>
                <TextInput source="title" className="form" />
                <RichTextInput
                    source="content.richText"
                    className="form"
                    label="Content"
                />
                <PostEditDraftElement />
                <RecordTagsFieldLabel>
                    <TagsListEdit resource="posts" />
                </RecordTagsFieldLabel>
            </SimpleForm>
        </Edit>
    );
}

export default PostEdit;

// TODO:
// If editing draft (unpublished post), then also have "published" boolean input.

// If is a draft and published set to true, then save current date as publishDate (like postCreate),
// Otherwise save current date as updatedAt date.
