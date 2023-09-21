'use client';
import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Box,
    Typography,
    Button,
    IconButton,
    Collapse,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { palette } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ResourceCard from './ResourceCard';
import ExpandMore from '../ExpandToggle';

function EventCard(props) {
    const [isExpanded, setExpanded] = useState(false);

    function handleExpandClick() {
        setExpanded(!isExpanded);
    }

    return (
        <Card className="card resource-card media" sx={{ display: 'flex' }}>
            <Box sx={{ p: '1.75rem' }}>
                <Box
                    color={'primary.contrastText'}
                    bgcolor={'primary.dark'}
                    sx={{
                        width: 80,
                        height: 80,
                        flexShrink: 0,
                        borderRadius: '.25rem',
                        py: '.5rem',
                        textAlign: 'center',
                    }}>
                    <Typography variant="h6" component="p">
                        {new Date(props.event.date.start)
                            .toLocaleDateString('en-us', { month: 'short' })
                            .toUpperCase()}
                    </Typography>
                    <Typography variant="h6" component="p">
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
                                    target="_blank"
                                    className="link"
                                    aria-label={`This ${action.label} page is on an external website, and opens in a new tab`}>
                                    {action.label}
                                </Button>
                            ) : (
                                <Button
                                    key={index}
                                    component={Link}
                                    href={props.event.action.link}
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
