import {
    List,
    Datagrid,
    SimpleList,
    ReferenceArrayField,
    SingleFieldList,
    TextField,
    TextInput,
    EditButton,
    DateField,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import TagField from '../TagField';

const bookFilters = [<TextInput label="Search" source="q" alwaysOn />];

function BookList() {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

    return (
        <List
            filters={bookFilters}
            sort={{ field: 'datePublished', order: 'DESC' }}>
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
                    <ReferenceArrayField
                        label="Tags"
                        reference="tags"
                        source="tags">
                        <SingleFieldList linkType={false}>
                            <TagField />
                        </SingleFieldList>
                    </ReferenceArrayField>
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

export default BookList;
