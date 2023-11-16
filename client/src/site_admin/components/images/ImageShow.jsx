import {
    Show,
    SimpleShowLayout,
    RichTextField,
    TextField,
    DateField,
    ImageField,
    WithRecord,
    useRecordContext,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { Container, Box, Typography, Divider } from '@mui/material';
import PageTitle from '../PageTitle';

function ImageShow() {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

    const record = useRecordContext();
    return (
        <Show title={<PageTitle resourceName="Image" />}>
            <Box
                sx={{
                    marginTop: '0',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    ml: '1rem',
                    // minWidth: { xs: '100%', lg: '50%' },
                }}>
                {isMobile ? (
                    <ImageField
                        source="url"
                        sx={{
                            mt: '.75rem',
                            minWidth: '100%',
                            flexShrink: 0,
                            // justifyContent: 'flex-start',
                            '& img': {
                                minHeight: '200px',
                                minWidth: '100%',
                                objectFit: 'contain',
                            },
                        }}
                    />
                ) : (
                    <ImageField
                        source="url"
                        sx={{
                            mt: '.75rem',
                            minWidth: '100%',

                            // justifyContent: 'flex-start',
                            '& img': {
                                minHeight: '325px',
                                minWidth: '50%',
                                objectFit: 'contain',
                            },
                        }}
                    />
                )}
            </Box>
            <SimpleShowLayout
                spacing={3}
                sx={{ marginLeft: '1rem', paddingY: '1rem' }}>
                {isMobile ? (
                    <Divider mt={'2rem'}>Image Details</Divider>
                ) : (
                    <Divider textAlign="left" mt={'2rem'}>
                        Image Details
                    </Divider>
                )}
                <TextField source="url" label="URL" />
                <TextField source="altText" label="Description" />
                {record && record.caption && (
                    <TextField source="caption" label="Caption" />
                )}
                <DateField source="createdAt" showTime />
            </SimpleShowLayout>
        </Show>
    );
}

export default ImageShow;
