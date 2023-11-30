'use client';
import { useState } from 'react';
import {
    Card,
    Box,
    CardHeader,
    CardContent,
    CardActions,
    CardMedia,
    Collapse,
    Typography,
    useMediaQuery,
    Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from '../ExpandToggle';
import {
    textLinkWrapper,
    cardMediaWithLink,
} from '../ResourceCardLinkWrappers';

function ResourceCard(props) {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('msm'));
    const [isExpanded, setExpanded] = useState(false);
    const break1 = 'xs';
    const break2 = 'msm';

    const mediaSX = props.mediaSXOverride
        ? props.mediaSXOverride
        : {
              width: { [break1]: 'unset', [break2]: 200 },
              height: { [break1]: 200, [break2]: 'unset' },
              flexShrink: 0,
          };
    const dateFormat = props.dateFormatOverride
        ? props.dateFormatOverride
        : {
              // weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          };
    const datePublished = props.published ? props.published : props.created;

    const expandButton = (
        <ExpandMore
            expand={isExpanded}
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            aria-label="Expand the article description"
            sx={{ ml: 'auto', mt: 'auto' }}>
            <ExpandMoreIcon />
        </ExpandMore>
    );

    function handleExpandClick() {
        setExpanded(!isExpanded);
    }

    return (
        <Card
            className={`card resource-card ${props.image && 'media'}`}
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: { [break1]: 'column', [break2]: 'row' },
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
            <Box className="resource-card content" width={'100%'}>
                <CardHeader
                    title={textLinkWrapper(props, props.title)}
                    subheader={
                        <>
                            <Typography variant="h6" component="p" mb={0}>
                                {new Date(datePublished).toLocaleDateString(
                                    'en-us',
                                    dateFormat
                                )}
                            </Typography>
                            {props.publisher && <div>{props.publisher}</div>}
                        </>
                    }
                />
                <Box sx={{ px: '1rem' }}>
                    <Divider
                        sx={{ width: { [break1]: '100%', [break2]: '80%' } }}
                    />
                </Box>
                {isSmall && props.content?.length > 180 ? (
                    <>
                        <CardContent>
                            {!isExpanded
                                ? props.content.substring(0, 150) + '...'
                                : props.content}
                            <Collapse in={isExpanded} timeout="auto"></Collapse>
                        </CardContent>
                        {props.actionsAlwaysShow ||
                            (props.actions && (
                                <CardActions>
                                    {!isExpanded
                                        ? props.actionsAlwaysShow
                                        : props.actions}
                                    {expandButton}
                                </CardActions>
                            ))}
                    </>
                ) : (
                    <>
                        <CardContent>{props.content}</CardContent>
                        {props.actions && (
                            <CardActions
                                sx={{
                                    paddingTop: '1rem',
                                    paddingLeft: '1rem',
                                    paddingRight: '1rem',
                                }}>
                                {props.actions}
                            </CardActions>
                        )}
                    </>
                )}
            </Box>
        </Card>
    );
}

export default ResourceCard;

//
//
// TEMP Archive ----------------------
//

// let linkAriaLabel;

// const linkAriaLabel =
//     props.mainLinkTo &&
//     (props.mainLinkLabel
//         ? props.mainLinkLabel
//         : `Link to full ${props.resource} page which opens in a new tab`);

// if (props.mediaSXOverride) {
//     mediaSX = props.mediaSXOverride;
// }
// if (props.dateFormatOverride) {
//     dateFormat = props.dateFormatOverride;
// }

// function linkWrapper(content) {
//     if (props.mainLinkTo) {
//         if (props.mainLinkIsLocal) {
//             return (
//                 <Link
//                     component={RouterLink}
//                     to={props.mainLinkTo}
//                     underline="none"
//                     sx={{ ':hover': { color: 'primary.dark' } }}>
//                     {content}
//                 </Link>
//             );
//         } else {
//             return (
//                 <Link
//                     href={props.mainLinkTo}
//                     target="_blank"
//                     aria-label={linkAriaLabel}
//                     underline="none"
//                     sx={{ ':hover': { color: 'primary.dark' } }}>
//                     {content}
//                 </Link>
//             );
//         }
//     } else {
//         return content;
//     }
// }

// function mediaWithLink() {
//     if (props.mainLinkIsLocal) {
//         return (
//             <CardMedia
//                 component={RouterLink}
//                 to={props.mainLinkTo}
//                 sx={mediaSX}
//                 image={props.image}
//                 title={props.imageAlt}
//             />
//         );
//     } else {
//         return (
//             <CardMedia
//                 component="a"
//                 href={props.mainLinkTo}
//                 target="_blank"
//                 aria-label={linkAriaLabel}
//                 sx={mediaSX}
//                 image={props.image}
//                 title={props.imageAlt}
//             />
//         );
//     }
// }
