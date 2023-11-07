import {
    Show,
    SimpleShowLayout,
    TextField,
    Datagrid,
    useRecordContext,
    ListBase,
    WithListContext,
} from 'react-admin';
import { Box, Typography, Stack } from '@mui/material';

const relatedResources = [
    { name: 'articles', label: 'Articles' },
    { name: 'posts', label: 'Posts' },
    { name: 'books', label: 'Books' },
];

function PageTitle() {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>Tag: &quot;{record.name}&quot;</span>;
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

function LinkedRecordsList({ refName }) {
    const record = useRecordContext();
    return record ? (
        <>
            <ListBase resource={refName} filter={{ tags: record._id }}>
                <WithListContext
                    render={({ isLoading, total, defaultTitle }) =>
                        !isLoading &&
                        total > 0 && (
                            <Box>
                                <Box display="flex" alignItems="center">
                                    <Typography
                                        variant="h5"
                                        component="p"
                                        mr={1}>
                                        {defaultTitle}
                                    </Typography>
                                    <Typography variant="h5" component="p">
                                        ({total})
                                    </Typography>
                                </Box>
                                <Datagrid
                                    rowClick="show"
                                    bulkActionButtons={false}
                                    sx={{
                                        '& .RaDatagrid-headerCell': {
                                            color: 'grey',
                                            fontStyle: 'italic',
                                        },
                                    }}>
                                    <TextField source="title" />
                                </Datagrid>
                                {/* <SimpleList

                                    primaryText={record => record.title}
                                    linkType="show"
                                /> */}
                                {/* {data.map(record => (
                                    
                                ))} */}
                            </Box>
                        )
                    }
                />
            </ListBase>
        </>
    ) : null;
}

function TagShow() {
    // const record = useRecordContext();
    return (
        <Show title={<PageTitle />} emptyWhileLoading>
            <SimpleShowLayout>
                <Box display="flex" alignItems={'center'} mb="2rem">
                    <TagColorCircle />
                    <TextField
                        source="name"
                        label="Name"
                        sx={{ fontSize: '1.75rem' }}
                    />
                </Box>
                <Stack gap={4}>
                    {relatedResources.map((resource, i) => (
                        <LinkedRecordsList key={i} refName={resource.name} />
                    ))}
                </Stack>
            </SimpleShowLayout>
        </Show>
    );
}

export default TagShow;
