import {
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
    RichTextField,
    DateField,
    Labeled,
    WithRecord,
} from 'react-admin';
import { Typography } from '@mui/material';
import PostTitle from './PostPageTitle';
import PostContentField from './postContentField';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

function PostShow() {
    return (
        <Show title={<PostTitle />}>
            <SimpleShowLayout
                sx={{ '& .RaSimpleShowLayout-stack': { gap: 2 } }}>
                <WithRecord
                    label={false}
                    render={record => (
                        <Typography variant="h4" component="h2" mb="1rem">
                            {record.title}
                        </Typography>
                    )}
                />
                <DateField
                    label="Created"
                    source="createdAt"
                    options={{
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }}
                />
                <PostContentField source="content" />
                <RecordTagsFieldLabel>
                    <TagsListEdit resource="posts" />
                </RecordTagsFieldLabel>
            </SimpleShowLayout>
        </Show>
    );
}

export default PostShow;
