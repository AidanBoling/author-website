'use client';
import { Box, Typography, Divider } from '@mui/material';
import DividerStyled from '../DividerStyled';

function PageTitle(props) {
    return (
        <Box
            mb={'3rem'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Typography variant="h2" component="h2" textAlign={'center'}>
                {props.title}
            </Typography>
            <DividerStyled sx={{ width: '80vw', maxWidth: '700px' }} />
        </Box>
    );
}

export default PageTitle;
