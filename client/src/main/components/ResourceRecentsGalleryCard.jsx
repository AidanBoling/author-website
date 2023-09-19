import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    Box,
    CardHeader,
    CardActions,
    CardMedia,
    Typography,
} from '@mui/material';
import { textLinkWrapper, cardMediaWithLink } from './ResourceCardLinkWrappers';

function ResourceGalleryCard(props) {
    const mediaSX = {
        height: 200,
        flexShrink: 0,
    };

    const dateFormat = props.dateFormatOverride
        ? props.dateFormatOverride
        : {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          };

    const datePublished = props.published ? props.published : props.created;

    return (
        <Card
            className={`card resource-card ${props.image && 'media'}`}
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '350px',
            }}>
            {props.image &&
                (props.mainLinkTo ? (
                    cardMediaWithLink(props, mediaSX)
                ) : (
                    <CardMedia
                        sx={mediaSX}
                        image={props.image}
                        title={props.imageAlt}
                    />
                ))}
            <Box className="resource-card content" mt={'auto'}>
                <CardHeader
                    sx={{ py: '.5rem' }}
                    title={
                        <Typography
                            variant="h6"
                            component="p"
                            sx={{ lineHeight: '1.6rem' }}>
                            {textLinkWrapper(props, props.title)}
                        </Typography>
                    }
                    subheader={
                        <div>
                            <Typography
                                variant="subheading1"
                                component="p"
                                mt={'.5rem'}>
                                {new Date(datePublished).toLocaleDateString(
                                    'en-us',
                                    dateFormat
                                )}
                            </Typography>
                            {props.publisher && (
                                <Typography
                                    variant="subheading1"
                                    component="p"
                                    sx={{ fontSize: '14px', mt: '.5rem' }}>
                                    {props.publisher}
                                </Typography>
                            )}
                        </div>
                    }
                />
                {props.actions && <CardActions>{props.actions}</CardActions>}
            </Box>
        </Card>
    );
}

export default ResourceGalleryCard;
