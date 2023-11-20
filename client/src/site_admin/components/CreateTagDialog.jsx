'use client';
import { useState } from 'react';
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import {
    useRecordContext,
    useCreateSuggestionContext,
    useUpdate,
    useCreate,
} from 'react-admin';

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

function randomColor() {
    const randomIndex = Math.floor(Math.random() * tagColors.length);
    return tagColors[randomIndex];
}

export default function CreateTagDialog({
    resource,
    isOpen,
    setOpen,
    newRecord,
}) {
    const record = useRecordContext();
    // Note: The conditional below breaks a react hook rule ("React Hook "useCreateSuggestionContext" is called conditionally. React Hooks must be called in the exact same order in every component render.")
    // However can't get it to work any other way (unless I duplicate this and adjust for New records only)
    const { filter, onCancel, onCreate } = newRecord
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
          useCreateSuggestionContext()
        : {};

    const [newTagName, setNewTagName] = useState((newRecord && filter) || '');
    const [newTagColor, setNewTagColor] = useState(randomColor);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(null);

    const [create] = useCreate();
    const [update] = useUpdate();

    function handleCloseDialog() {
        if (newRecord) {
            onCancel();
        } else {
            setOpen(false);
        }

        setDisabled(false);
        setError(null);
        setNewTagName('');
        setNewTagColor(randomColor);
    }

    function handleCreateTag(event) {
        event.preventDefault();
        setDisabled(true);

        create(
            'tags',
            { data: { name: newTagName, color: newTagColor } },
            {
                onSuccess: tag => {
                    updateRecord(tag);
                },
                onError: error => {
                    setError(
                        "Couldn't create tag; try saving again. Contact admin if you continue to get this error."
                    );
                    console.log(error);
                    setDisabled(false);
                },
            }
        );
    }

    function updateRecord(tag) {
        if (newRecord) {
            onCreate(tag);
            handleCloseDialog();
        } else {
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
                        setNewTagColor(randomColor);
                        console.log(error);
                    },
                }
            );
        }
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
                            onChange={event =>
                                setNewTagName(event.target.value)
                            }
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
