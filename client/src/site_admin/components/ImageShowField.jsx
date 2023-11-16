import { ImageField, ReferenceField, useRecordContext } from 'react-admin';

export default function CustomShowImageField({ sx }) {
    const record = useRecordContext();
    if (!record || !record.image) return null;
    return record.image.fromDB ? (
        <ReferenceField source="image.fromDB" reference="images">
            <ImageField source="url" label={false} sx={sx} />
        </ReferenceField>
    ) : (
        <ImageField source="image.url" label={false} sx={sx} />
    );
}
