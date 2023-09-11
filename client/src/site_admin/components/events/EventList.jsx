import {
    Datagrid,
    List,
    TextField,
    TextInput,
    EditButton,
    DateField,
} from 'react-admin';

function EventList() {
    return (
        <List>
            <Datagrid rowClick="show">
                <TextField source="title" />

                <DateField source="date.start" />
                <DateField source="date.end" />
                {/* <ReferenceField source="userId" reference="users" link="show" /> */}
                <EditButton />
            </Datagrid>
        </List>
    );
}

export default EventList;
