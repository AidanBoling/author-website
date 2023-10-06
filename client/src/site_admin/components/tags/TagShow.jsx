import {
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
    RichTextField,
    DateField,
    FunctionField,
    Datagrid,
    ReferenceArrayField,
    Labeled,
    useRecordContext,
    useListContext,
    Pagination,
} from 'react-admin';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const relatedResources = [
    { name: 'articles', label: 'Articles' },
    { name: 'posts', label: 'Posts' },
    { name: 'books', label: 'Books' },
];

function PageTitle() {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>Tag: "{record.name}"</span>;
}

function TagColorCircle() {
    const record = useRecordContext();
    if (!record) return null;
    return (
        <Box display="flex">
            <Box
                sx={{
                    bgcolor: record.color,
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    alignSelf: 'center',
                    flexShrink: 0,
                    display: 'inline-block',
                    m: '.75rem',
                    // mt: '.4rem',
                }}
            />
        </Box>
    );
}

const LinkToRelatedRecords = () => {
    const record = useRecordContext();
    // const translate = useTranslate();
    return record ? (
        <Button
            color="primary"
            component={Link}
            to={{
                pathname: '/posts',
                search: `filter=${JSON.stringify({ tags: record._id })}`,
            }}>
            All posts with the tag {record.name} ;
        </Button>
    ) : null;
};

function HasTag({ refName, refLabel }) {
    const record = useRecordContext();
    return record ? (
        <ReferenceArrayField
            label={refLabel}
            reference={refName}
            target="tags"
            // perPage={5}
            // pagination={<Pagination />}
        >
            <RefResultsList />
            {/* <Datagrid>
                <TextField source="title" />
                <DateField source="datePublished" />
            </Datagrid> */}
        </ReferenceArrayField>
    ) : null;
}

function RefResultsList() {
    const recordList = useListContext();
    if (recordList.length === 0) {
        console.log('No results');
    }
    return (
        <Datagrid>
            <TextField source="title" />
            <DateField source="datePublished" />
        </Datagrid>
    );
}

function TagShow() {
    const record = useRecordContext();
    // const articlesList = <HasTag refName="articles" refLabel="Articles" />
    return (
        <Show title={<PageTitle />} emptyWhileLoading>
            <SimpleShowLayout>
                {/* <ReferenceManyField source="userId" reference="users" /> */}

                <Box display="flex" alignItems={'center'} mb="2rem">
                    <TagColorCircle />
                    <TextField
                        source="name"
                        label="Name"
                        sx={{ fontSize: '1.75rem' }}
                    />
                </Box>
                <LinkToRelatedRecords />
                {relatedResources.map(resource => (
                    <Box>
                        <Typography variant="h5" component="p">
                            {resource.label}
                        </Typography>
                        <HasTag
                            refName={resource.name}
                            refLabel={resource.label}
                        />
                    </Box>
                ))}
            </SimpleShowLayout>
        </Show>
    );
}

export default TagShow;
