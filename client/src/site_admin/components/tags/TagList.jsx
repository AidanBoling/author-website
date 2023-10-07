import {
    Datagrid,
    DateField,
    SimpleList,
    List,
    ReferenceField,
    TextField,
    ChipField,
    FunctionField,
    useRecordContext,
    WithRecord,
} from 'react-admin';
import { Box, Chip } from '@mui/material';
import TagField, { TagChip } from '../TagField';

export default function TagList() {
    const record = useRecordContext();
    function TagColor() {
        const record = useRecordContext();
        if (!record) return null;
        return (
            <Box display="flex">
                <Box
                    sx={{
                        bgcolor: record.color,
                        width: 15,
                        height: 15,
                        borderRadius: 15,
                        alignSelf: 'center',
                        flexShrink: 0,
                        display: 'inline-block',
                        m: '.2rem',
                        // mt: '.4rem',
                    }}
                />
            </Box>
        );
    }

    return (
        <List sort={{ field: 'name', order: 'ASC' }}>
            {/* <SimpleList
                primaryText={record => (
                    <Chip
                        label={record.name}
                        variant="outlined"
                        size="large"
                        sx={{
                            borderColor: record.color,
                            borderWidth: '2px',
                            // backgroundColor: record.color
                        }}
                    />
                )}
                linkType={'show'}
                // leftIcon={record => (
                //     <Box
                //         sx={{
                //             bgcolor: record.color,
                //             width: 15,
                //             height: 15,
                //             borderRadius: 15,
                //             alignSelf: 'center',
                //             flexShrink: 0,
                //             display: 'inline-block',
                //             // mr: 1.5,
                //             // mt: 1,
                //         }}
                //     />
                // )}
            // /> */}
            <Datagrid rowClick="show">
                {/* <TagField outlined /> */}
                <FunctionField
                    label="Name"
                    source="name"
                    render={record => <TagChip outlined />}
                />
                {/* <TagColor />
                <TextField source="name" /> */}
                {/* <TextField source="name" /> */}
            </Datagrid>
        </List>
    );
}
