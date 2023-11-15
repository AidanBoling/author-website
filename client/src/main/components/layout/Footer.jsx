'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    Box,
    Container,
    Typography,
    Link as MuiLink,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BgPatternBox from '../style/BgPatternBox';
import NewsletterFormComponentContent from '../forms/NewsletterFormComponent';
import pageContent from '@/main/content/authorDetails.json';

function Footer(props) {
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: props.height,
                    mt: 'auto',
                    backgroundColor: 'forestgreen.light',
                    // zIndex: 1,
                    overflowY: 'hidden',
                }}>
                <BgPatternBox height={props.height} />
                <Container sx={{ height: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            height: '100%',
                            py: '1.5rem',
                        }}>
                        <Box
                            zIndex={1}
                            sx={{
                                display: 'inline-flex',
                                m: '.75rem',
                                fontSize: '1.1rem',
                                fontWeight: 'lighter',
                                alignItems: 'center',
                            }}>
                            <MuiLink
                                component={Link}
                                href={'/contact'}
                                aria-label={`Contact ${pageContent.author.name}`}
                                underline="none"
                                align={'center'}
                                mx={'.75rem'}>
                                Contact
                            </MuiLink>
                            <Box color={'lightgold.main'} fontSize={'.75rem'}>
                                •
                            </Box>
                            <MuiLink
                                component="button"
                                onClick={handleClickOpen}
                                aria-label={`Subscribe to ${pageContent.author.name}'s newsletter mailing list`}
                                underline="none"
                                sx={{ marginX: '.75rem' }}>
                                Subscribe
                            </MuiLink>
                        </Box>
                        <Typography sx={{ fontSize: '14px' }}>
                            © {new Date().getFullYear()}{' '}
                            {pageContent.author.name}
                        </Typography>
                        {/* <Typography sx={{ fontSize: '14px' }}>
                        Site by Aidan Boling
                    </Typography> */}
                    </Box>
                </Container>
            </Box>

            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogActions sx={{ padding: 0 }}>
                    <IconButton
                        color="primary"
                        onClick={handleClose}
                        aria-label="Close dialog"
                        sx={{ margin: '.3rem', padding: '.1rem' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                <DialogContent
                    sx={{
                        p: '2.2rem',
                        pt: 0,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                    }}>
                    <NewsletterFormComponentContent />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Footer;
