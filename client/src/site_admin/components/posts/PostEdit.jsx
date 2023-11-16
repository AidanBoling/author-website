import { Edit } from 'react-admin';
import PostTitle from './PostPageTitle';
import PostForm from './PostForm';

function PostEdit() {
    return (
        <Edit title={<PostTitle />} redirect="show">
            <PostForm />
        </Edit>
    );
}

export default PostEdit;

// [x] TODO:
// If editing draft (unpublished post), then also have "published" boolean input.

// If is a draft and published set to true, then save current date as publishDate (like postCreate),
// Otherwise save current date as updatedAt date.
