'use client';
import { Container, Paper } from '@mui/material';
import PageTitle from './PageTitle';
import InnerPageContainer, { pagePaddingX } from './InnerPageContainer';

function PageWrapper(props) {
    // const paddingXMd = '2rem';
    // const paddingXSm = '1rem';
    // const marginXSm = '.5rem';

    return (
        <Container className="main" sx={{ my: '1rem', flexGrow: 0 }}>
            {props.header && <PageTitle title={props.header} />}
            <InnerPageContainer className="content">
                {props.children}
                {/* {props.usePaper ? (
                    <Paper
                        elevation={1}
                        sx={{
                            p: { xs: pagePaddingX.sm, md: pagePaddingX.md },
                        }}>
                        {props.children}
                    </Paper>
                ) : (
                    props.children
                )} */}
            </InnerPageContainer>
        </Container>
    );
}

export default PageWrapper;
