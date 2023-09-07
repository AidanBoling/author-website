import {
    Datagrid,
    List,
    ReferenceField,
    TextField,
    EditButton,
    DateField,
    UrlField,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';

function ArticleList() {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

    return (
        <List>
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
                    <TextField source="descriptionShort" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

export default ArticleList;
