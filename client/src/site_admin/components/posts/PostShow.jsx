import {
    Show,
    SimpleShowLayout,
    ImageField,
    DateField,
    WithRecord,
    useRecordContext,
} from 'react-admin';
import { Grid, Typography, Divider } from '@mui/material';
import PostTitle from './PostPageTitle';
import PostContentField from './postContentField';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

const PostShow = () => (
    <Show title={<PostTitle />}>
        <PostShowLayout />
    </Show>
);

function PostShowLayout() {
    const record = useRecordContext();

    if (!record) return null;
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <WithRecord
                        label={false}
                        render={record => (
                            <Typography
                                variant="h4"
                                component="h2"
                                mb="1rem"
                                ml="1rem">
                                {record.title}
                            </Typography>
                        )}
                    />
                </Grid>
                <Grid item>
                    <ImageField
                        source="image.url"
                        label={false}
                        sx={{
                            ml: '.5rem',
                            '& img': {
                                minHeight: '275px',
                                objectFit: 'contain',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SimpleShowLayout
                        sx={{ '& .RaSimpleShowLayout-stack': { gap: 2 } }}>
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
                        {record && record.published ? (
                            <DateField
                                label="Date Published"
                                source="datePublished"
                            />
                        ) : null}
                        <RecordTagsFieldLabel>
                            <TagsListEdit resource="posts" />
                        </RecordTagsFieldLabel>
                    </SimpleShowLayout>
                </Grid>
                <Grid item xs={12}>
                    <SimpleShowLayout>
                        <Divider />
                        <PostContentField source="content" />
                    </SimpleShowLayout>
                </Grid>
            </Grid>
        </>
    );
}

export default PostShow;
