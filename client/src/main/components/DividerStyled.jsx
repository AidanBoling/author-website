'use client';
import { Box, Divider } from '@mui/material';

export default function DividerStyled({ gap, sx }) {
    const style = {
        marginLeft: 'auto',
        marginRight: 'auto',
        ...sx,
    };

    return (
        <Box sx={style}>
            <Divider sx={{ mb: gap || '1px' }} />
            <Divider />
        </Box>
    );
}
