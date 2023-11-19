'use client';
import { Box, Typography } from '@mui/material';
import DividerStyled from '../DividerStyled';
import InnerPageContainer from './InnerPageContainer';

function PageTitle(props) {
    return (
        <InnerPageContainer sx={{ mt: 0 }}>
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
                <DividerStyled
                    sx={{
                        width: '100%',
                    }}
                />
            </Box>
        </InnerPageContainer>
    );
}

export default PageTitle;
