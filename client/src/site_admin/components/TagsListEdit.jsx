import { useState } from 'react';
import { Box, Chip, Menu, MenuItem } from '@mui/material';
import { Labeled, useRecordContext, useUpdate, useGetList } from 'react-admin';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import CreateTagDialog from './CreateTagDialog';

export function RecordTagsFieldLabel(props) {
    return (
        <Labeled
            label="Tags"
            sx={{
                fontStyle: 'italic',
                fontSize: '1.25rem',
                pl: '.5rem',
            }}>
            {props.children}
        </Labeled>
    );
}

function RecordTagsDeleteable({ resource, tags }) {
    const record = useRecordContext();
    const [update] = useUpdate();

    // fetch all tags related to the current record

    // const { data, total, isLoading, error } = useGetManyReference('tags', {
    //     target: '_id',
    //     id: record._id,
    // });

    function handleDeleteTag(id) {
        const tags = record.tags.filter(tagId => tagId !== id);
        update(
            resource,
            {
                id: record._id,
                data: { tags },
                previousData: record,
            },
            {
                mutationMode: 'optimistic',
            }
        );
    }

    // if (isLoading) {
    //     return null;
    // }
    // if (error) {
    //     return <p>ERROR</p>;
    // }
    if (!tags) return null;

    return (
        <Box display="flex">
            {tags.map(tag => (
                <Box m={0.5} key={tag._id}>
                    <Chip
                        size="small"
                        variant="outlined"
                        label={tag.name}
                        style={{ backgroundColor: tag.color, border: 0 }}
                        onDelete={() => handleDeleteTag(tag._id)}
                    />
                </Box>
            ))}
        </Box>
    );
}

export default function TagsListEdit(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    // const [recordTags, setRecordTags] = useState();
    const record = useRecordContext();
    const [update] = useUpdate();

    // const { data: tags, isLoading: isLoadingRecordTags } = useGetMany(
    //     'tags',
    //     { ids: record.tags },
    //     { enabled: record && record.tags && record.tags.length > 0 }
    // );

    const { data: allTags, isLoading: isLoadingAllTags } = useGetList('tags', {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'name', order: 'ASC' },
    });

    if (isLoadingAllTags) return null;

    const recordTagIdsSource = record.tags;
    const tags =
        allTags && allTags.filter(tag => recordTagIdsSource.includes(tag.id));
    const unselectedTags =
        allTags && allTags.filter(tag => !recordTagIdsSource.includes(tag.id));

    function handleTagMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleAddTag(id) {
        const tags = [...record.tags, id];
        update(
            props.resource,
            {
                id: record._id,
                data: { tags },
                previousData: record,
            },
            {
                mutationMode: 'optimistic',
            }
        );
        setAnchorEl(null);
    }

    function handleOpenCreateDialog() {
        setDialogOpen(true);
        setAnchorEl(null);
    }

    // if (isLoadingRecordTags || !data || isLoadingAllTags) return null;
    // console.log(tags);
    // console.log('Record tags (via filtered AllTags): ', tags);
    return (
        <>
            {tags && (
                <RecordTagsDeleteable resource={props.resource} tags={tags} />
            )}

            <Box mt={1}>
                <Chip
                    icon={<ControlPointIcon />}
                    size="small"
                    variant="outlined"
                    onClick={handleTagMenuOpen}
                    label="Add tag"
                    color="primary"
                />
            </Box>
            <Menu
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}>
                {unselectedTags?.map(tag => (
                    <MenuItem
                        key={tag._id}
                        onClick={() => handleAddTag(tag._id)}>
                        <Chip
                            size="small"
                            variant="outlined"
                            label={tag.name}
                            style={{
                                backgroundColor: tag.color,
                                border: 0,
                            }}
                            onClick={() => handleAddTag(tag._id)}
                        />
                    </MenuItem>
                ))}
                <MenuItem onClick={handleOpenCreateDialog}>
                    <Chip
                        icon={<EditIcon />}
                        size="small"
                        variant="outlined"
                        onClick={handleOpenCreateDialog}
                        color="primary"
                        label="Create new tag"
                    />
                </MenuItem>
            </Menu>

            <CreateTagDialog
                resource={props.resource}
                isOpen={dialogOpen}
                setOpen={setDialogOpen}
            />
        </>
    );
}

//
//
// TEMP Archive --------------------
//

// function TagFieldAddButtonMenu({ unselectedTags, children }) {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const record = useRecordContext();
//     const [update] = useUpdate();

//     function handleTagMenuOpen(event) {
//         setAnchorEl(event.currentTarget);
//     }

//     function handleTagMenuClose() {
//         setAnchorEl(null);
//     }

//     function handleAddTag(id) {
//         const tags = [...record.tags, id];
//         update(
//             props.resource,
//             {
//                 id: record._id,
//                 data: { tags },
//                 previousData: record,
//             },
//             {
//                 mutationMode: 'optimistic',
//             }
//         );
//         setAnchorEl(null);
//     }

//     return (
//         <>
//             <Box mt={1}>
//                 <Chip
//                     icon={<ControlPointIcon />}
//                     size="small"
//                     variant="outlined"
//                     onClick={handleTagMenuOpen}
//                     label="Add tag"
//                     color="primary"
//                 />
//             </Box>
//             <Menu
//                 open={Boolean(anchorEl)}
//                 onClose={handleTagMenuClose}
//                 anchorEl={anchorEl}>
//                 {unselectedTags?.map(tag => (
//                     <MenuItem
//                         key={tag._id}
//                         onClick={() => handleAddTag(tag._id)}>
//                         <Chip
//                             size="small"
//                             variant="outlined"
//                             label={tag.name}
//                             style={{
//                                 backgroundColor: tag.color,
//                                 border: 0,
//                             }}
//                             onClick={() => handleAddTag(tag._id)}
//                         />
//                     </MenuItem>
//                 ))}
//                 {children}
//             </Menu>
//         </>
//     );
// }

//
//
//              <Box display="flex">
//     {tags.map(tag => (
//         <Box m={0.5} key={tag._id}>
//             <Chip
//                 size="small"
//                 variant="outlined"
//                 label={tag.name}
//                 style={{ backgroundColor: tag.color, border: 0 }}
//                 onDelete={() => handleDeleteTag(tag._id)}
//             />
//         </Box>
//     ))}
// </Box> */}
// {/* <TagFieldAddButtonMenu unselectedTags={unselectedTags}>
//     <MenuItem onClick={handleOpenCreateDialog}>
//         <Chip
//             icon={<EditIcon />}
//             size="small"
//             variant="outlined"
//             onClick={handleOpenCreateDialog}
//             color="primary"
//             label="Create new tag"
//         />
//     </MenuItem>
// </TagFieldAddButtonMenu> */}
