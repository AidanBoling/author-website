import {
    Datagrid,
    List,
    ReferenceArrayField,
    SingleFieldList,
    TextField,
    TextInput,
    EditButton,
    DateField,
    BooleanInput,
} from 'react-admin';
import TagField from '../TagField';

const postFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <BooleanInput label="Published" source="published" alwaysOn />,
];

//TODO: troubleshoot how to get search filter field to show search button...

function PostList() {
    return (
        <List
            filters={postFilters}
            filterDefaultValues={{ published: true }}
            sort={{ field: 'datePublished', order: 'DESC' }}>
            <Datagrid rowClick="show">
                <DateField source="createdAt" />
                <TextField source="title" />
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
