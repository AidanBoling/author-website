import {
    List,
    Datagrid,
    SimpleList,
    ReferenceArrayField,
    ReferenceArrayInput,
    SelectArrayInput,
    SingleFieldList,
    TextField,
    TextInput,
    EditButton,
    DateField,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import TagField from '../TagField';

const bookFilters = [
    <TextInput label="Search" source="q" alwaysOn variant="outlined" />,
    <ReferenceArrayInput reference="tags" source="tags">
        <SelectArrayInput optionText="name" variant="outlined" />
    </ReferenceArrayInput>,
];

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
                <Datagrid
                    rowClick="show"
                    sx={{
                        '& .column-tags': { minWidth: '175px' },
                        '& .column-title': { minWidth: '225px' },
                    }}>
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
