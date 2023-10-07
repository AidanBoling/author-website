import { useState } from 'react';
import {
    Box,
    Chip,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import {
    Labeled,
    useGetMany,
    useRecordContext,
    useUpdate,
    useGetList,
    useCreate,
} from 'react-admin';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';

const tagColors = [
    '#ff85f9',
    '#c979fa',
    '#7a66d0',
    '#3689cd',
    '#16d4db',
    '#16dbb7',
    '#7ce377',
    '#B9E769',
    '#EFEA5A',
    '#F1C453',
    '#F29E4C',
    '#ff6063',
    '#a3a3a3',
    '#d0d0d0',
];

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

// function ColorPickerButton({ color, handleClick, selected }) {
//     return (
//         <Box
//             component="button"
//             type="button"
//             sx={{
//                 bgcolor: color,
//                 width: 30,
//                 height: 30,
//                 borderRadius: 15,
//                 border: selected ? '3px solid lightgrey' : 'none',
//                 display: 'inline-block',
//                 margin: 1.25,
//             }}
//             onClick={handleClick}
//         />
//     );
// }

function CreateTagDialog({ resource, isOpen, setOpen }) {
    const record = useRecordContext();
    const [disabled, setDisabled] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState(tagColors[0]);
    const [error, setError] = useState(null);
    const [create] = useCreate();
    const [update] = useUpdate();

    function handleNewTagNameChange(event) {
        setNewTagName(event.target.value);
    }

    function handleCloseDialog() {
        setOpen(false);
        setDisabled(false);
        setError(null);
        setNewTagName('');
        setNewTagColor(tagColors[0]);
    }

    function handleCreateTag(event) {
        event.preventDefault();
        setDisabled(true);
        create(
            'tags',
            { data: { name: newTagName, color: newTagColor } },
            {
                onSuccess: tag => {
                    update(
                        resource,
                        {
                            id: record._id,
                            data: { tags: [...record.tags, tag._id] },
                            previousData: record,
                        },
                        {
                            onSuccess: () => {
                                handleCloseDialog();
                            },
                            onError: error => {
                                setError(
                                    "Tag created, but not added to record. Close this dialog, then select tag from tag list (via 'Add tag' button)"
                                );
                                setNewTagName('');
                                setNewTagColor(tagColors[0]);
                                console.log(error);
                            },
                        }
                    );
                },
                onError: error => {
                    setDialogError(
                        "Couldn't create tag; try saving again. Contact admin if you continue to get this error."
                    );
                    console.log(error);
                    setDisabled(false);
                },
            }
        );
    }

    function ColorPickerButton({ color, handleClick, selected }) {
        return (
            <Box
                component="button"
                type="button"
                sx={{
                    bgcolor: color,
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    border: selected ? '3px solid lightgrey' : 'none',
                    display: 'inline-block',
                    margin: 1.25,
                }}
                onClick={handleClick}
            />
        );
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleCloseDialog}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="xs">
            <form onSubmit={handleCreateTag}>
                <DialogTitle id="form-dialog-title">
                    Create a new tag
                </DialogTitle>
                <DialogContent>
                    <Box display="flex">
                        <Box
                            sx={{
                                bgcolor: newTagColor,
                                width: 17,
                                height: 17,
                                borderRadius: 15,
                                alignSelf: 'center',
                                flexShrink: 0,
                                display: 'inline-block',
                                mr: 1.5,
                                mt: 1,
                            }}
                        />
                        <TextField
                            autoFocus
                            label="Tag name"
                            fullWidth
                            value={newTagName}
                            onChange={handleNewTagNameChange}
                            sx={{ mt: 1 }}
                        />
                    </Box>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        width={360}
                        mt={2}
                        mx="auto">
                        {tagColors.map(color => (
                            <ColorPickerButton
                                key={color}
                                color={color}
                                selected={color === newTagColor}
                                handleClick={() => {
                                    setNewTagColor(color);
                                }}
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        disabled={disabled}>
                        Add tag
                    </Button>
                </DialogActions>
                <DialogActions>
                    {error && (
                        <Typography width={'90%'} mb=".5rem" color="error">
                            Something went wrong:
                            <br />
                            {error}
                        </Typography>
                    )}
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default function TagsListEdit(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    // const [recordTags, setRecordTags] = useState();
    const record = useRecordContext();
    const [update] = useUpdate();

    const { data: tags, isLoading: isLoadingRecordTags } = useGetMany(
        'tags',
        { ids: record.tags },
        { enabled: record && record.tags && record.tags.length > 0 }
    );
    const { data: allTags, isLoading: isLoadingAllTags } = useGetList('tags', {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'name', order: 'ASC' },
    });

    const unselectedTags =
        allTags && allTags.filter(tag => !record.tags.includes(tag.id));

    function handleDeleteTag(id) {
        const tags = record.tags.filter(tagId => tagId !== id);
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

    function handleTagMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleTagMenuClose() {
        setAnchorEl(null);
    }

    function handleOpenCreateDialog() {
        setDialogOpen(true);
        setAnchorEl(null);
    }

    if (isLoadingRecordTags || !tags || isLoadingAllTags) return null;

    return (
        <>
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
                onClose={handleTagMenuClose}
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
