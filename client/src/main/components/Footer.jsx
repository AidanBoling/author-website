import { Box, Container, Typography } from '@mui/material';
import InnerPageContainer from './InnerPageContainer';
import BgPatternBox from './BgPatternBox';

function Footer(props) {
    return (
        <Box
            sx={{
                width: '100%',
                height: props.height,
                mt: 'auto',
                backgroundColor: 'forestgreen.light',
                zIndex: 1,
                overflowY: 'hidden',
            }}>
            <BgPatternBox height={props.height} />
            <Container>
                <Typography sx={{ fontSize: '14px' }}>
                    © {new Date().getFullYear()} Lauren Hall
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                    Created by Aidan Boling
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
