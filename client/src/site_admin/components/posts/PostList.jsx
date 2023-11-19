import {
    Datagrid,
    List,
    ReferenceArrayField,
    ReferenceArrayInput,
    SelectArrayInput,
    SingleFieldList,
    TextField,
    TextInput,
    EditButton,
    DateField,
    BooleanInput,
} from 'react-admin';
import TagField from '../TagField';

// TODO: troubleshoot how to get search filter field to show search button...

function PostList() {
    const postFilters = [
        <TextInput label="Search" source="q" alwaysOn variant="outlined" />,
        // <BooleanInput label="Published" source="published" alwaysOn />,
        <ReferenceArrayInput reference="tags" source="tags">
            <SelectArrayInput optionText="name" variant="outlined" />
        </ReferenceArrayInput>,
    ];

    return (
        <List
            filters={postFilters}
            filterDefaultValues={{ published: true }}
            sort={{ field: 'datePublished', order: 'DESC' }}>
            <Datagrid
                rowClick="show"
                sx={{
                    '& .column-tags': { minWidth: '175px' },
                    '& .column-createdAt': { maxWidth: '150px' },
                    '& .column-datePublished': { maxWidth: '150px' },
                }}>
                <TextField source="title" />
                <DateField source="datePublished" />

                <DateField source="createdAt" />
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
        </List>
    );
}

export default PostList;
