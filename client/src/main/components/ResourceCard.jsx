import {
    Card,
    Box,
    CardHeader,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
} from '@mui/material';

function ResourceCard(props) {
    let mediaSX = { width: 200, flexShrink: 0 };
    let dateFormat = {
        // weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    let hasMediaClass = '';
    if (props.hasMedia) {
        hasMediaClass = 'media';
    }
    if (props.mediaSXOverride) {
        mediaSX = props.mediaSXOverride;
    }
    if (props.dateFormatOverride) {
        dateFormat = props.dateFormatOverride;
    }

    return (
        <Card
            className={`card resource-card ${hasMediaClass}`}
            sx={{ display: 'flex' }}>
            {props.hasMedia && props.image && (
                <CardMedia
                    sx={mediaSX}
                    image={props.image}
                    title={props.imageAlt}
                />
            )}
            <Box className="resource-card content">
                <CardHeader
                    title={props.title}
                    subheader={
                        props.published
                            ? new Date(props.published).toLocaleDateString(
                                  'en-us',
                                  dateFormat
                              )
                            : new Date(props.created).toLocaleDateString(
                                  'en-us',
                                  dateFormat
                              )
                    }
                />
                <CardContent>{props.content}</CardContent>
                <CardActions>{props.actions}</CardActions>
            </Box>
        </Card>
    );
}

export default ResourceCard;

{
    /* <ResourceCard
    title={props.article.title}
    hasMedia
    image={props.article.image.url}
    imageAlt={props.article.image.altText}
    published={props.article.datePublished}
    created={props.article.createdAt}
    content={props.article.descriptionShort}
    actions={
        props.article.content ? (
            <Link
                to={`/published/articles/id/${props.article._id}`}
                className="link">
                <Button>➣ Read article</Button>
            </Link>
        ) : (
            <a href={props.article.url} className="link">
                <Button>
                    ➣ Read article on {props.article.publisher.name}
                </Button>
            </a>
        )
    }
/>; */
}
