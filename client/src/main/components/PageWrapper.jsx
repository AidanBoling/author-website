import {
    Container,
    Box,
    Paper,
    Button,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import PageTitle from './PageTitle';
import InnerPageContainer from './InnerPageContainer';
import { pagePaddingX } from './InnerPageContainer';

function PageWrapper(props) {
    // const paddingXMd = '2rem';
    // const paddingXSm = '1rem';
    // const marginXSm = '.5rem';

    return (
        <Container className="main" sx={{ my: '1rem' }}>
            {props.header && <PageTitle title={props.header} />}
            <InnerPageContainer className="content">
                {props.content &&
                    (props.usePaper ? (
                        <Paper
                            elevation={1}
                            sx={{
                                p: { xs: pagePaddingX.sm, md: pagePaddingX.md },
                            }}>
                            {props.content}
                        </Paper>
                    ) : (
                        props.content
                    ))}
            </InnerPageContainer>
        </Container>
    );
}

export default PageWrapper;
