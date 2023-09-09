import {
    Card,
    Box,
    CardHeader,
    CardContent,
    CardActions,
    CardMedia,
} from '@mui/material';

function ResourceCard(props) {
    let mediaSX = { width: 200, flexShrink: 0 };
    let hasMediaClass = '';
    if (props.hasMedia) {
        hasMediaClass = 'media';
    }
    if (props.mediaSXOverride) {
        mediaDim = mediaDimOverride;
    }

    return (
        <Card
            className={`card resource-card ${hasMediaClass}`}
            sx={{ display: 'flex' }}>
            {props.hasMedia && (
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
                            ? new Date(props.published).toLocaleDateString()
                            : new Date(props.created).toLocaleDateString()
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
