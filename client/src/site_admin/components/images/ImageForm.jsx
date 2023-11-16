'use client';
import {
    SimpleForm,
    TextInput,
    ImageInput,
    ImageField,
    required,
} from 'react-admin';

function ImageForm({ edit }) {
    return (
        <SimpleForm>
            {!edit && (
                <ImageInput
                    source="image"
                    label="Image File"
                    accept="image/*"
                    placeholder={<p>Drop your file here</p>}
                    validate={required()}
                    className="form">
                    <ImageField source="src" title="title" />
                </ImageInput>
            )}
            <TextInput source="title" className="form" validate={required()} />
            <TextInput
                source="altText"
                label="Image description (accessibility)"
                validate={required()}
                className="form"
            />
            <TextInput
                source="caption"
                label="Caption (optional)"
                className="form"
            />

            {/* <Grid container spacing={2} className="form">
                <Grid item xs={12} sm={6}>
                    <DateInput source="datePublished" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectInput
                        source="category"
                        choices={[
                            { id: 'fiction', name: 'Fiction' },
                            { id: 'non-fiction', name: 'Non-Fiction' },
                        ]}
                        fullWidth
                    />
                </Grid>
            </Grid> */}
        </SimpleForm>
    );
}

export default ImageForm;
