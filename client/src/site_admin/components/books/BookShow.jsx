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
import BookTitle from './BookPageTitle';

function BookShow() {
    return (
        <Show title={<BookTitle />}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <ImageField source="coverImageUrl" />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <SimpleShowLayout>
                        {/* <ImageField source="coverImageUrl" /> */}
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
