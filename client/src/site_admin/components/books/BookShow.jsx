import {
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
    RichTextField,
    DateField,
    ImageField,
} from 'react-admin';
import BookTitle from './BookPageTitle';

function BookShow() {
    return (
        <Show title={<BookTitle />}>
            <SimpleShowLayout>
                {/* <ImageField source="coverImageUrl" /> */}
                <TextField source="title" />
                <DateField source="datePublished" />
                <RichTextField source="description.long" label="Description" />
                {/* Category */}
                {/* <ReferenceField source="tagsId" reference="tags" /> */}
            </SimpleShowLayout>
        </Show>
    );
}

export default BookShow;
