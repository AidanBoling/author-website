'use client';
import {
    SimpleForm,
    TextInput,
    ImageInput,
    ImageField,
    SelectArrayInput,
    // required,
} from 'react-admin';
import filterVars from '@/admin/data/listFilterVars.json';

function ImageForm({ edit }) {
    return (
        <SimpleForm>
            {!edit && (
                <ImageInput
                    source="image"
                    label="Image File"
                    accept="image/*"
                    // placeholder={<p>Drop your file here</p>}
                    className="form">
                    <ImageField source="src" title="title" />
                </ImageInput>
            )}
            <TextInput source="title" className="form" />
            <TextInput
                source="altText"
                label="Image description (accessibility)"
                className="form"
            />
            <TextInput
                source="caption"
                label="Caption (optional)"
                className="form"
            />
            <SelectArrayInput
                source="group"
                label="Groups"
                choices={filterVars.imagesGroups}
                optionText="label"
                optionValue="id"
            />
            {/* <Grid container spacing={2} className="form">
                <Grid item xs={12} sm={6}>
                    <DateInput source="datePublished" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    
                </Grid>
            </Grid> */}
        </SimpleForm>
    );
}

export default ImageForm;
