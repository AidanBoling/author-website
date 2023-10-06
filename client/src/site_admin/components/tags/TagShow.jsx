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
    Pagination,
} from 'react-admin';
import { Box, Typography } from '@mui/material';

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

function HasTag({ refName, refLabel }) {
    // const record = useRecordContext();
    return (
        <ReferenceArrayField
            label={refLabel}
            reference={refName}
            target="tags"
            perPage={5}
            pagination={<Pagination />}>
            <Datagrid>
                <TextField source="title" />
                <DateField source="datePublished" />
            </Datagrid>
        </ReferenceArrayField>
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
