import { ReferenceInput, SelectInput, useRecordContext } from 'react-admin';
import { Box } from '@mui/material';

export default function FormImageField({ newRecord }) {
    const record = useRecordContext();

    if (!newRecord && !record) return null;
    return (
        <>
            <Box sx={{ width: '50%' }}>
                <ReferenceInput reference="images" source="image.fromDB">
                    <SelectInput
                        optionText="title"
                        label="Cover Image"
                        fullWidth
                    />
                </ReferenceInput>
            </Box>
            {/* <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            source="image.url"
                            label="Cover Image URL"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            source="image.altText"
                            label="Image Description (accessibility)"
                            fullWidth
                        />
                    </Grid>
                </Grid> */}
        </>
    );
}
