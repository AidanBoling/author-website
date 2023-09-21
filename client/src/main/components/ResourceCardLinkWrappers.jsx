'use client';
import Link from 'next/link';
import { Link as MuiLink, CardMedia } from '@mui/material';

function linkAriaLabel(props) {
    if (props.mainLinkTo) {
        if (props.mainLinkLabel) {
            return props.mainLinkLabel;
        } else {
            return `Link to full ${props.resource} page which opens in a new tab`;
        }
    }
}

function textLinkWrapper(props, content) {
    if (props.mainLinkTo) {
        if (props.mainLinkIsLocal) {
            return (
                <MuiLink
                    component={Link}
                    href={props.mainLinkTo}
                    underline="none"
                    sx={{ ':hover': { color: 'primary.dark' } }}>
                    {content}
                </MuiLink>
            );
        } else {
            return (
                <MuiLink
                    href={props.mainLinkTo}
                    target="_blank"
                    aria-label={linkAriaLabel(props)}
                    underline="none"
                    sx={{ ':hover': { color: 'primary.dark' } }}>
                    {content}
                </MuiLink>
            );
        }
    } else {
        return content;
    }
}

function cardMediaWithLink(props, mediaSX) {
    if (props.mainLinkIsLocal) {
        return (
            <CardMedia
                component={Link}
                href={props.mainLinkTo}
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
                aria-label={linkAriaLabel(props)}
                sx={mediaSX}
                image={props.image}
                title={props.imageAlt}
            />
        );
    }
}

export { textLinkWrapper, cardMediaWithLink };
