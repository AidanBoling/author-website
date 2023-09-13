import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Box,
    Typography,
    Button,
    IconButton,
    Link,
    Collapse,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { palette } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ResourceCard from './ResourceCard';

const ExpandMore = styled(props => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    // marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function EventCard(props) {
    const [isExpanded, setExpanded] = useState(false);

    function handleExpandClick() {
        setExpanded(!isExpanded);
    }

    return (
        <Card className="card resource-card media" sx={{ display: 'flex' }}>
            <Box sx={{ p: '1.75rem' }}>
                <Box
                    bgcolor={'primary.dark'}
                    sx={{
                        width: 75,
                        height: 75,
                        flexShrink: 0,
                        borderRadius: '.25rem',
                        pt: '.5rem',
                    }}>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{ textAlign: 'center' }}>
                        {new Date(props.event.date.start)
                            .toLocaleDateString('en-us', { month: 'short' })
                            .toUpperCase()}
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{ textAlign: 'center' }}>
                        {new Date(props.event.date.start).toLocaleDateString(
                            'en-us',
                            { day: 'numeric' }
                        )}
                    </Typography>
                </Box>
            </Box>
            <Box className="resource-card content" sx={{ width: '100%' }}>
                <CardHeader title={props.event.title} />
                <CardContent>
                    <List>
                        <ListItem disablePadding>
                            <ListItemText
                                primary={new Date(
                                    props.event.date.start
                                ).toLocaleDateString('en-us', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText
                                primary={`${new Date(
                                    props.event.date.start
                                ).toLocaleTimeString('en-US', {
                                    timeStyle: 'short',
                                })} — ${new Date(
                                    props.event.date.end
                                ).toLocaleTimeString('en-US', {
                                    timeStyle: 'short',
                                })}`}
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary={props.event.location} />
                        </ListItem>
                    </List>
                </CardContent>

                <CardActions sx={{ display: 'flex' }}>
                    {props.event.actions > 0 &&
                        props.event.actions.map((action, index) =>
                            props.event.action.external ? (
                                <Button
                                    key={index}
                                    href={action.link}
                                    className="link"
                                    aria-label={`${action.label} link, which opens an external website`}>
                                    {action.label}
                                </Button>
                            ) : (
                                <Button
                                    key={index}
                                    component={RouterLink}
                                    to={props.event.action.link}
                                    className="link">
                                    {action.label}
                                </Button>
                            )
                        )}
                    {props.event.details && (
                        <ExpandMore
                            expand={isExpanded}
                            onClick={handleExpandClick}
                            aria-expanded={isExpanded}
                            aria-label="show more event details">
                            <ExpandMoreIcon />
                        </ExpandMore>
                    )}
                </CardActions>
                {props.event.details && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        props.event.details
                                    ),
                                }}
                            />
                        </CardContent>
                    </Collapse>
                )}
            </Box>
        </Card>
    );
}

export default EventCard;
