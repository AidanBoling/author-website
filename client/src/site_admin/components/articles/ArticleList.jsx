import {
    Datagrid,
    List,
    ReferenceField,
    TextField,
    EditButton,
    DateField,
    UrlField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    FunctionField,
} from 'react-admin';
import { useMediaQuery, Chip } from '@mui/material';
import TagField from '../TagField';

function ArticleList() {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

    return (
        <List sort={{ field: 'datePublished', order: 'DESC' }}>
            {isMobile ? (
                <SimpleList
                    primaryText={record => record.title}
                    // secondaryText={record => record.publisher.name}
                    tertiaryText={record =>
                        new Date(record.datePublished).getFullYear()
                    }
                    linkType="show"
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="title" />
                    <UrlField source="url" />
                    <TextField source="publisher.name" />
                    <DateField source="datePublished" />
                    {/* <TextField source="descriptionShort" /> */}
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

export default ArticleList;
