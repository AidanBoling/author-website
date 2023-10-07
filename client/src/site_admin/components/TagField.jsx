import {
    ReferenceArrayField,
    SingleFieldList,
    FunctionField,
    useRecordContext,
} from 'react-admin';
import { Chip } from '@mui/material';

// This is for one tag -- to get an array (in a list field), wrap with RefArrayField and SingleFieldList:
// <ReferenceArrayField label="Tags" reference="tags" source="tags">
//      <SingleFieldList linkType={false}>
//              [[TagField]]

// (Note: header label & sort won't work properly if ^those are part of of a component imported to List component )

export function TagChip(props) {
    const record = useRecordContext();
    return (
        <Chip
            label={record.name}
            variant="outlined"
            size="large"
            sx={{
                borderColor: record.color,
                borderWidth: props.outlined ? '2px' : '0px',
                backgroundColor: !props.outlined && record.color,
            }}
        />
    );
}

export default function TagField(props) {
    return (
        <FunctionField
            source="name"
            label="Name"
            sortBy="name"
            render={record => (
                <TagChip record={record} outlined={props.outlined} />
            )}
        />
    );
}
