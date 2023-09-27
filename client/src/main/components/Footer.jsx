'use client';
import { Box, Container, Typography } from '@mui/material';
// import InnerPageContainer from './InnerPageContainer';
import BgPatternBox from './style/BgPatternBox';

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
            <Container sx={{ height: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        height: '100%',
                        py: '2rem',
                    }}>
                    <Typography sx={{ fontSize: '14px' }}>
                        © {new Date().getFullYear()} Lauren Hall
                    </Typography>
                    <Typography sx={{ fontSize: '14px' }}>
                        Created by Aidan Boling
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
