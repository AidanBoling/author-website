'use client';
import { Container } from '@mui/material';

function InnerPageContainer(props) {
    const pagePaddingX = { sm: '1rem', md: '2rem' };

    return (
        <Container
            className={props.className}
            sx={{
                width: { xs: '100%', sm: '90%', lg: '80%' },
                maxWidth: '1000px',
                my: '2.5vh',
                px: props.usePaper
                    ? 0
                    : {
                          xs: '.25rem',
                          sm: pagePaddingX.sm,
                          md: pagePaddingX.md,
                      },
                // px: { xs: '.25rem' },
                ...props.sx,
            }}>
            {props.children}
        </Container>
    );
}

export default InnerPageContainer;
