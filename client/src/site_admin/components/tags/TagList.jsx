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
} from 'react-admin';
import { Box, Chip } from '@mui/material';

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
        <List>
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
                <FunctionField
                    source={record => record.name}
                    label="Name"
                    sortBy={record => record.name}
                    render={record => (
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
                />
                {/* <ChipField
                    source="name"
                    variant="outlined"
                    size="large"
                    sx={{
                        borderColor: !record ? 'lightgrey' : record.color,
                        borderWidth: '2px',
                        // backgroundColor: record.color
                    }}
                /> */}
                {/* <TagColor />
                <TextField source="name" /> */}
                {/* <TextField source="name" /> */}
            </Datagrid>
        </List>
    );
}
