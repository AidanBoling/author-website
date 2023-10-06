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
                    <ReferenceArrayField
                        label="Tags"
                        reference="tags"
                        source="tags">
                        <SingleFieldList linkType={false}>
                            <TagField />
                        </SingleFieldList>
                    </ReferenceArrayField>
                    <ReferenceArrayField
                        label="Tags"
                        reference="tags"
                        source="tags">
                        <SingleFieldList linkType={false}>
                            <FunctionField
                                source="name"
                                label="Name"
                                sortBy="name"
                                render={record => (
                                    <Chip
                                        label={record.name}
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            borderColor: record.color,
                                            borderWidth: '2px',
                                            // backgroundColor: record.color
                                        }}
                                    />
                                )}
                            />
                            {/* <ChipField
                                source="name"
                                size="small"
                                backgroundColor="color"
                                style={{ backgroundColor: 'color', border: 0 }}
                            /> */}
                        </SingleFieldList>
                    </ReferenceArrayField>
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

export default ArticleList;
