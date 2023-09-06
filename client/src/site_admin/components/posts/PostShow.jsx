import {
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
    RichTextField,
    DateField,
} from 'react-admin';
import PostTitle from './PostPageTitle';
import PostContentField from './postContentField';

function PostShow() {
    return (
        <Show title={<PostTitle />}>
            <SimpleShowLayout>
                {/* <TextField source="id" /> */}
                <DateField source="createdAt" />
                <TextField source="title" />
                {/* <ReferenceField source="userId" reference="users" /> */}
                {/* <RichTextField source="content.richText" /> */}
                <PostContentField source="content" />
            </SimpleShowLayout>
        </Show>
    );
}

export default PostShow;
