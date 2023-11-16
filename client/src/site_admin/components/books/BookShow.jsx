import {
    Show,
    SimpleShowLayout,
    RichTextField,
    TextField,
    DateField,
    ImageField,
    WithRecord,
    ReferenceField,
    useRecordContext,
} from 'react-admin';
import { Grid, Typography, Divider } from '@mui/material';

import PageTitle from '../PageTitle';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

export default function BookShow() {
    const record = useRecordContext();
    const imageSx = {
        mt: '.75rem',
        '& img': {
            minHeight: '325px',
            minWidth: '250px',
            objectFit: 'contain',
        },
    };

    return (
        <Show title={<PageTitle resourceName="Book" />}>
            <Grid container spacing={2}>
                <Grid item>
                    <BookCoverImageShow sx={imageSx} />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <SimpleShowLayout spacing={2}>
                        <WithRecord
                            label={false}
                            render={record => (
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    mb="1rem">
                                    {record.title}
                                </Typography>
                            )}
                        />
                        <DateField source="datePublished" />
                        <TextField
                            source="description.short"
                            label="Short Description"
                        />
                        <TextField source="category" label="Category" />
                        <RecordTagsFieldLabel>
                            <TagsListEdit resource="books" />
                        </RecordTagsFieldLabel>
                        {/* Category */}
                    </SimpleShowLayout>
                </Grid>
                <Grid item xs={12}>
                    <SimpleShowLayout>
                        <Divider />
                        <RichTextField
                            source="description.long"
                            label="Full Description"
                        />
                    </SimpleShowLayout>
                </Grid>
            </Grid>
        </Show>
    );
}

function BookCoverImageShow({ sx }) {
    const record = useRecordContext();

    if (!record) return null;

    return record.coverImage ? (
        <ReferenceField source="coverImage" reference="images">
            <ImageField source="url" sx={sx} />
        </ReferenceField>
    ) : (
        <ImageField
            source="coverImagePlaceholder"
            sx={sx}
            label="Image Placeholder"
        />
    );
}
