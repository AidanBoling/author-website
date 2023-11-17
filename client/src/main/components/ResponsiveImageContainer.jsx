'use client';
import { Box } from '@mui/material';

export default function ResponsiveImageContainer(props) {
    const marginSize = props.marginSize ? props.marginSize : '2rem';
    const breakpoint = props.breakpoint ? props.breakpoint : 'md';
    const floatSX = props.float
        ? { xs: 'unset', [breakpoint]: props.float }
        : 'unset';

    const marginSide = props.float
        ? props.float === 'right'
            ? 'ml'
            : 'mr'
        : 'mx';
    const marginXSX = { xs: 0, [breakpoint]: marginSize };
    const margin = {
        [marginSide]: marginXSX,
        mb: marginSize,
        mt: '.5rem',
    };

    return (
        <Box
            sx={{
                ...margin,
                display: { xs: 'flex', [breakpoint]: 'inline block' },
                justifyContent: 'center',
                float: floatSX,
                shapeOutside: 'margin-box',
                ...props.max,
            }}>
            {props.children}
        </Box>
    );
}
