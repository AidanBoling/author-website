import {
    Datagrid,
    List,
    // TextInput,
    FunctionField,
    // useRecordContext,
} from 'react-admin';
import { TagChip } from '../TagField';

// const tagFilters = [<TextInput label="Search" source="q" alwaysOn />];

export default function TagList() {
    // const record = useRecordContext();
    // function TagColor() {
    //     const record = useRecordContext();
    //     if (!record) return null;
    //     return (
    //         <Box display="flex">
    //             <Box
    //                 sx={{
    //                     bgcolor: record.color,
    //                     width: 15,
    //                     height: 15,
    //                     borderRadius: 15,
    //                     alignSelf: 'center',
    //                     flexShrink: 0,
    //                     display: 'inline-block',
    //                     m: '.2rem',
    //                     // mt: '.4rem',
    //                 }}
    //             />
    //         </Box>
    //     );
    // }

    return (
        <List
            // filters={tagFilters}
            sort={{ field: 'name', order: 'ASC' }}>
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
                    render={() => <TagChip outlined />}
                    // TODO: Check use of record here. Replaced with above b/c react linter
                    // yelled at me on build, but will probably break something...
                    // render={record => <TagChip outlined />}
                />
                {/* <TagColor />
                <TextField source="name" /> */}
                {/* <TextField source="name" /> */}
            </Datagrid>
        </List>
    );
}
