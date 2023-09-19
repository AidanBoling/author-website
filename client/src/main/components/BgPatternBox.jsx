import { Box } from '@mui/material';

function BgPatternBox(props) {
    return (
        <Box
            component="div"
            className="bg pattern"
            sx={{
                width: '100%',
                height: props.height,
                position: 'absolute',
                opacity: '.3',
            }}
        />
    );
}

export default BgPatternBox;
