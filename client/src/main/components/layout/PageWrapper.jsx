'use client';
import Container from '@mui/material/Container';
import PageTitle from './PageTitle';
import InnerPageContainer from './InnerPageContainer';
// import { pagePaddingX } from '../utils/pagePaddingX';

function PageWrapper(props) {
    return (
        <Container
            className="main"
            sx={{ my: '1.5rem', pb: { md: '3rem' }, flexGrow: 0 }}>
            {props.header && <PageTitle title={props.header} />}
            <InnerPageContainer className="content">
                {props.children}
            </InnerPageContainer>
        </Container>
    );
}

export default PageWrapper;
