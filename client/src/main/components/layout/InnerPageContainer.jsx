'use client';
import { Container } from '@mui/material';

function InnerPageContainer(props) {
    return (
        <Container
            className={props.className}
            sx={{
                width: { xs: '100%', sm: '97%', md: '90%', lg: '80%' },
                maxWidth: '1000px',
                my: '2.5vh',
                // px: { xs: '.25rem' },
                ...props.sx,
            }}>
            {props.children}
        </Container>
    );
}

export default InnerPageContainer;
