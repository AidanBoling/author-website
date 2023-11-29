'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import BgPatternBox from '../style/BgPatternBox';
import NewsletterFormComponentContent from '../forms/NewsletterFormComponent';
import pageContent from '@/main/content/authorDetails.json';
// import logo from '@/assets/logo-art.png';

function Footer(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const dialogIsFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <Box
                component="footer"
                sx={{
                    width: '100%',
                    height: props.height,
                    mt: 'auto',
                    backgroundColor: 'forestgreen.light',
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
                            pt: '2rem',
                            pb: '1.25rem',
                        }}>
                        <Box
                            zIndex={1}
                            sx={{
                                mb: '.65rem',
                                width: '250px',
                                paddingLeft: '20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '1.1rem',
                                fontWeight: 'lighter',
                                alignItems: 'center',
                            }}>
                            <MuiLink
                                color={'lightgold.main'}
                                component={Link}
                                href={'/contact'}
                                aria-label={`Contact ${pageContent.author.name}`}
                                underline="none"
                                align={'center'}
                                pr={'.20rem'}
                                sx={{ fontWeight: '300' }}>
                                Contact
                            </MuiLink>
                            <Box
                                sx={{
                                    flexGrow: 0,
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    zIndex: '2',
                                }}>
                                <Box
                                    sx={{
                                        width: '50px',
                                        height: '50px',
                                    }}>
                                    <Image
                                        src={pageContent.logo.url}
                                        alt={pageContent.logo.altText}
                                        width={50}
                                        height={50}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>
                            </Box>
                            {/* <Box color={'lightgold.main'} fontSize={'.75rem'}>
                                •
                            </Box> */}
                            <MuiLink
                                color={'lightgold.main'}
                                component="button"
                                onClick={handleClickOpen}
                                aria-label={`Subscribe to ${pageContent.author.name}'s newsletter mailing list`}
                                underline="none"
                                sx={{ fontWeight: '300' }}>
                                Subscribe
                            </MuiLink>
                        </Box>
                        <Typography
                            component="small"
                            color={'grey.medLight'}
                            sx={{ fontSize: '14px', mb: 'auto', mt: '.65rem' }}>
                            © {new Date().getFullYear()}{' '}
                            {pageContent.author.name}
                        </Typography>
                        {/* <Typography sx={{ fontSize: '14px' }}>
                        Site by Aidan Boling
                    </Typography> */}
                    </Box>
                </Container>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'md'}
                fullWidth={!dialogIsFullScreen}
                fullScreen={dialogIsFullScreen}>
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
