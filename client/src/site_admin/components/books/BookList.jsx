import {
    Datagrid,
    List,
    ReferenceField,
    TextField,
    TextInput,
    EditButton,
    DateField,
} from 'react-admin';

function BookList() {
    return (
        <List>
            <Datagrid rowClick="show">
                <TextField source="title" />
                <DateField source="datePublished" />
                <TextField source="description.short" />
                <EditButton />
            </Datagrid>
        </List>
    );
}

export default BookList;
