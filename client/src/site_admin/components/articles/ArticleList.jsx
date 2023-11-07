'use client';
import {
    Datagrid,
    List,
    TextField,
    TextInput,
    EditButton,
    DateField,
    UrlField,
    ReferenceArrayField,
    SingleFieldList,
    SimpleList,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import TagField from '../TagField';

const articleFilters = [<TextInput label="Search" source="q" alwaysOn />];

function ArticleList() {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

    return (
        <List
            filters={articleFilters}
            sort={{ field: 'datePublished', order: 'DESC' }}>
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
