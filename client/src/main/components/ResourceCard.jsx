import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    Box,
    CardHeader,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    Link,
} from '@mui/material';

function ResourceCard(props) {
    let mediaSX = props.mediaSXOverride
        ? props.mediaSXOverride
        : { width: 200, flexShrink: 0 };
    let dateFormat = props.dateFormatOverride
        ? props.dateFormatOverride
        : {
              // weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          };
    let datePublished = props.published ? props.published : props.created;
    let linkAriaLabel;

    // if (props.mediaSXOverride) {
    //     mediaSX = props.mediaSXOverride;
    // }
    // if (props.dateFormatOverride) {
    //     dateFormat = props.dateFormatOverride;
    // }
    if (props.mainLinkTo) {
        linkAriaLabel = props.mainLinkLabel
            ? props.mainLinkLabel
            : `Link to full ${props.resource} page which opens in a new tab`;
    }

    function linkWrapper(content) {
        if (props.mainLinkTo) {
            if (props.mainLinkIsLocal) {
                return (
                    <Link
                        component={RouterLink}
                        to={props.mainLinkTo}
                        underline="none">
                        {content}
                    </Link>
                );
            } else {
                return (
                    <Link
                        href={props.mainLinkTo}
                        target="_blank"
                        aria-label={linkAriaLabel}
                        underline="none">
                        {content}
                    </Link>
                );
            }
        } else {
            return content;
        }
    }

    function mediaWithLink() {
        if (props.mainLinkIsLocal) {
            return (
                <CardMedia
                    component={RouterLink}
                    to={props.mainLinkTo}
                    sx={mediaSX}
                    image={props.image}
                    title={props.imageAlt}
                />
            );
        } else {
            return (
                <CardMedia
                    component="a"
                    href={props.mainLinkTo}
                    target="_blank"
                    aria-label={linkAriaLabel}
                    sx={mediaSX}
                    image={props.image}
                    title={props.imageAlt}
                />
            );
        }
    }

    return (
        <Card
            className={`card resource-card ${props.image && 'media'}`}
            elevation={3}
            sx={{ display: 'flex' }}>
            {props.image &&
                (props.mainLinkTo ? (
                    mediaWithLink()
                ) : (
                    <CardMedia
                        sx={mediaSX}
                        image={props.image}
                        title={props.imageAlt}
                    />
                ))}
            <Box className="resource-card content">
                <CardHeader
                    title={linkWrapper(props.title)}
                    subheader={
                        <div>
                            <Typography variant="h6" component="p">
                                {new Date(datePublished).toLocaleDateString(
                                    'en-us',
                                    dateFormat
                                )}
                            </Typography>
                            {props.publisher && <div>{props.publisher}</div>}
                        </div>
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
