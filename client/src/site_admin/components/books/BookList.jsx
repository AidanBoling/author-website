import {
    List,
    Datagrid,
    SimpleList,
    ReferenceField,
    TextField,
    TextInput,
    EditButton,
    DateField,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';

function BookList() {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

    return (
        <List>
            {isMobile ? (
                <SimpleList
                    primaryText={record => record.title}
                    // secondaryText={record => `${record.views} views`}
                    tertiaryText={record =>
                        new Date(record.datePublished).getFullYear()
                    }
                    linkType="show"
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="title" />
                    <DateField source="datePublished" />
                    <TextField source="description.short" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

export default BookList;
