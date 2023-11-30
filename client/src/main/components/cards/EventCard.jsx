'use client';
import { useState } from 'react';
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
    Collapse,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import ResourceCardError from '../errors/ResourceCardError';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from '../ExpandToggle';

function EventCard({ event }) {
    const [isExpanded, setExpanded] = useState(false);
    const break1 = 'xs';
    const break2 = 'msm';

    function handleExpandClick() {
        setExpanded(!isExpanded);
    }

    return (
        <ErrorBoundary fallback={<ResourceCardError item={event} />}>
            <Card
                className="card resource-card media"
                sx={{
                    display: 'flex',
                    flexDirection: { [break1]: 'column', [break2]: 'row' },
                }}>
                <Box
                    sx={{
                        p: '1.75rem',
                        pb: { [break1]: 0, [break2]: '1.75rem' },
                    }}>
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
                        {event.date && (
                            <>
                                <Typography variant="h6" component="p" m={0}>
                                    {new Date(event.date.start)
                                        .toLocaleDateString('en-us', {
                                            month: 'short',
                                        })
                                        .toUpperCase()}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component="p"
                                    mt={'-.2rem'}>
                                    {new Date(
                                        event.date.start
                                    ).toLocaleDateString('en-us', {
                                        day: 'numeric',
                                    })}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Box>
                <Box className="resource-card content" sx={{ width: '100%' }}>
                    <CardHeader title={event.title} />
                    <Divider sx={{ marginLeft: '1rem', width: '80%' }} />
                    <CardContent>
                        <List sx={{ paddingY: 0 }}>
                            <ListItem disablePadding>
                                <ListItemText
                                    primary={
                                        event.date &&
                                        new Date(
                                            event.date.start
                                        ).toLocaleDateString('en-us', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })
                                    }
                                />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText
                                    primary={
                                        event.date &&
                                        `${new Date(
                                            event.date.start
                                        ).toLocaleTimeString('en-US', {
                                            timeStyle: 'short',
                                        })} — ${new Date(
                                            event.date.end
                                        ).toLocaleTimeString('en-US', {
                                            timeStyle: 'short',
                                        })}`
                                    }
                                />
                            </ListItem>
                            {event.location && (
                                <ListItem disablePadding>
                                    <ListItemText primary={event.location} />
                                </ListItem>
                            )}
                        </List>
                    </CardContent>

                    <CardActions sx={{ display: 'flex' }}>
                        {event.actions > 0 &&
                            event.actions.map((action, index) =>
                                action.external ? (
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
                                        href={action.link}
                                        className="link">
                                        {action.label}
                                    </Button>
                                )
                            )}
                        {event.details && (
                            <Box sx={{ display: 'flex' }}>
                                <ExpandMore
                                    expand={isExpanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={isExpanded}
                                    aria-label="show more event details">
                                    <ExpandMoreIcon />
                                </ExpandMore>
                                <Typography
                                    sx={{
                                        ml: '.2rem',
                                        alignSelf: 'center',
                                        color: 'grey.main',
                                    }}>
                                    <i>More Details</i>
                                </Typography>
                            </Box>
                        )}
                    </CardActions>
                    {event.details && (
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                            <CardContent sx={{ paddingY: '0 !important' }}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            event.details
                                        ),
                                    }}
                                />
                            </CardContent>
                        </Collapse>
                    )}
                </Box>
            </Card>
        </ErrorBoundary>
    );
}

export default EventCard;
