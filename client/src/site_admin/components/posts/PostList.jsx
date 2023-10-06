import {
    Datagrid,
    List,
    ReferenceField,
    TextField,
    TextInput,
    ReferenceInput,
    EditButton,
    DateField,
    BooleanInput,
} from 'react-admin';

const postFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <BooleanInput label="Published" source="is_published" alwaysOn />,
];

//TODO: troubleshoot how to get search filter field to show search button...

function PostList() {
    return (
        <List
            filters={postFilters}
            filterDefaultValues={{ is_published: true }}>
            <Datagrid rowClick="show">
                <DateField source="createdAt" />

                {/* <TextField source="id" /> */}
                <TextField source="title" />
                {/* <ReferenceField source="userId" reference="users" link="show" /> */}
                <EditButton />
            </Datagrid>
        </List>
    );
}

export default PostList;
