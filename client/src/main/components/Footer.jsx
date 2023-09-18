import { Box } from '@mui/material';
import InnerPageContainer from './InnerPageContainer';

function Footer() {
    return (
        // <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        //     <Box sx={{ flexGrow: 0 }}></Box>

        <Box
            sx={{
                width: '100%',
                height: '200px',
                mt: 'auto',
                backgroundColor: 'forestgreen.light',
                zIndex: 1,
            }}></Box>
    );
}

export default Footer;
