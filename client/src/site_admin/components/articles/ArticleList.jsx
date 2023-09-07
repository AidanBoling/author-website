import {
    Datagrid,
    List,
    ReferenceField,
    TextField,
    EditButton,
    DateField,
    UrlField,
} from 'react-admin';

function ArticleList() {
    return (
        <List>
            <Datagrid rowClick="show">
                <TextField source="title" />
                <UrlField source="url" />
                <TextField source="publisher.name" />
                <DateField source="datePublished" />
                <TextField source="descriptionShort" />
                <EditButton />
            </Datagrid>
        </List>
    );
}

export default ArticleList;
