import {
    Show,
    SimpleShowLayout,
    TextField,
    RichTextField,
    DateField,
    ImageField,
} from 'react-admin';
import { Grid } from '@mui/material';

import PageTitle from '../PageTitle';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

function BookShow() {
    return (
        <Show title={<PageTitle resourceName="Book" />}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <ImageField source="coverImage" />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <SimpleShowLayout>
                        {/* <ImageField source="coverImage" /> */}
                        <TextField source="title" label={false} />
                        <DateField source="datePublished" />
                        <RichTextField
                            source="description.long"
                            label="Description"
                        />
                        {/* Category */}
                        <RecordTagsFieldLabel>
                            <TagsListEdit resource="books" />
                        </RecordTagsFieldLabel>
                    </SimpleShowLayout>
                </Grid>
            </Grid>
        </Show>
    );
}

export default BookShow;
