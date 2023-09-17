import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    Box,
    CardHeader,
    CardContent,
    CardActions,
    CardMedia,
    Collapse,
    Typography,
    Link,
    useMediaQuery,
} from '@mui/material';
import { textLinkWrapper, cardMediaWithLink } from './ResourceCardLinkWrappers';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandMore from './ExpandToggle';

function ResourceCard(props) {
    // const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));
    // const [isExpanded, setExpanded] = useState(false);

    // const mediaSX = props.mediaSXOverride
    //     ? props.mediaSXOverride
    //     : {
    //           width: { xs: 'unset', md: 200 },
    //           height: { xs: 200, md: 'unset' },
    //           flexShrink: 0,
    //       };
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

    // const linkAriaLabel =
    //     props.mainLinkTo &&
    //     (props.mainLinkLabel
    //         ? props.mainLinkLabel
    //         : `Link to full ${props.resource} page which opens in a new tab`);

    // const expandButton = (
    //     <ExpandMore
    //         expand={isExpanded}
    //         onClick={handleExpandClick}
    //         aria-expanded={isExpanded}
    //         aria-label="show more"
    //         sx={{ ml: 'auto', mt: 'auto' }}>
    //         <ExpandMoreIcon />
    //     </ExpandMore>
    // );

    // if (props.mediaSXOverride) {
    //     mediaSX = props.mediaSXOverride;
    // }
    // if (props.dateFormatOverride) {
    //     dateFormat = props.dateFormatOverride;
    // }

    // function handleExpandClick() {
    //     setExpanded(!isExpanded);
    // }

    return (
        <Card
            className={`card resource-card ${props.image && 'media'}`}
            elevation={3}
            // sx={{
            //     display: 'flex',
            //     flexDirection: 'column',
            // }}
        >
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
            <Box className="resource-card content">
                <CardHeader
                    title={textLinkWrapper(props, props.title)}
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
                <CardActions>{props.actions}</CardActions>
            </Box>
        </Card>
    );
}

export default ResourceCard;
