'use client';
import { Container } from '@mui/material';

export const pagePaddingX = { sm: '1rem', md: '2rem' };

function InnerPageContainer(props) {
    return (
        <>
            <Container
                className={props.className}
                sx={{
                    width: { xs: '100%', md: '90%', lg: '80%' },
                    maxWidth: '1000px',
                    my: '2.5vh',
                    px: props.usePaper
                        ? 0
                        : { sm: pagePaddingX.sm, md: pagePaddingX.md },
                    px: { xs: '.25rem' },
                    ...props.sx,
                }}>
                {props.children}
            </Container>
        </>
    );
}

export default InnerPageContainer;
