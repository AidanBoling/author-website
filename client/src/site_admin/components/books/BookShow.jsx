import {
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
    RichTextField,
    DateField,
    ImageField,
} from 'react-admin';
import { Grid } from '@mui/material';

import PageTitle from '../PageTitle';

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
                        {/* <ReferenceField source="tagsId" reference="tags" /> */}
                    </SimpleShowLayout>
                </Grid>
            </Grid>
        </Show>
    );
}

export default BookShow;
