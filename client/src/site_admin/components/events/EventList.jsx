import {
    Datagrid,
    List,
    TextField,
    TextInput,
    EditButton,
    DateField,
} from 'react-admin';

const eventFilters = [<TextInput label="Search" source="q" alwaysOn />];

function EventList() {
    return (
        <List filters={eventFilters}>
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
