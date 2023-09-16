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

function PageWrapper(props) {
    const paddingXMd = '2rem';
    const paddingXSm = '1rem';
    // const marginXSm = '.5rem';

    return (
        <Container className="main" sx={{ my: '2.5vh' }}>
            {props.header && <PageTitle title={props.header} />}
            <Container
                className="content"
                sx={{
                    width: { xs: '100%', md: '90%', lg: '80%' },
                    maxWidth: '1000px',
                    my: '2.5vh',
                    px: props.usePaper ? 0 : { sm: paddingXSm, md: paddingXMd },
                    px: { xs: '.25rem' },
                }}>
                {props.content &&
                    (props.usePaper ? (
                        <Paper
                            elevation={1}
                            sx={{ p: { xs: paddingXSm, md: paddingXMd } }}>
                            {props.content}
                        </Paper>
                    ) : (
                        props.content
                    ))}
            </Container>
        </Container>
    );
}

export default PageWrapper;
