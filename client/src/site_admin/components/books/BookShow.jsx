import {
    Show,
    SimpleShowLayout,
    RichTextField,
    TextField,
    DateField,
    ImageField,
    WithRecord,
} from 'react-admin';
import { Grid, Typography, Divider } from '@mui/material';

import PageTitle from '../PageTitle';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

function BookShow() {
    return (
        <Show title={<PageTitle resourceName="Book" />}>
            <Grid container spacing={2}>
                <Grid item>
                    <ImageField
                        source="coverImage"
                        sx={{
                            mt: '.75rem',
                            '& img': {
                                minHeight: '325px',
                                minWidth: '250px',
                                objectFit: 'contain',
                            },
                        }}
                    />
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

export default BookShow;
