'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Container,
    Box,
    Paper,
    Typography,
    Button,
    IconButton,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function ResourcesGalleryContainer(props) {
    const [disableButton, setDisableButton] = useState({
        left: true,
        right: false,
    });

    const { resolvedTheme } = useTheme();
    const theme = useMuiTheme();
    const isXS = useMediaQuery(theme.breakpoints.down('sm'));

    const paperColors =
        resolvedTheme === 'dark'
            ? {
                  backgroundColor: 'greyAlpha10.main',
              }
            : {
                  borderColor: 'forestgreenAlpha80.light',
                  backgroundColor: 'forestgreenAlpha10.lightest',
              };

    // const paperBdColor = resolvedTheme === 'light' && {
    //     borderColor: 'forestgreen.light',
    // };

    const checkButtonsOnScroll = element => {
        const scrollMax = element.scrollWidth - element.offsetWidth;
        const currentScrollLeft = element.scrollLeft;

        if (disableButton.left === true && currentScrollLeft > 0) {
            // console.log('Setting LEFT button disabled = false');
            setDisableButton({ ...disableButton, left: false });
        }
        if (disableButton.left === false && currentScrollLeft === 0) {
            // console.log('Setting LEFT button disabled = true');
            setDisableButton({ ...disableButton, left: true });
        }
        if (
            disableButton.right === false &&
            currentScrollLeft >= scrollMax - 5
        ) {
            // console.log('Setting RIGHT button disabled = true');
            setDisableButton({ ...disableButton, right: true });
        }
        if (disableButton.right === true && currentScrollLeft < scrollMax) {
            // console.log('Setting RIGHT button disabled = false');
            setDisableButton({ ...disableButton, right: false });
        }
    };

    const sideScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;

        const scrollMax = element.scrollWidth - element.offsetWidth;
        // let setLeft = disableButton.left;
        // let setRight = disableButton.right;

        // console.log('ScrollWidth - Width: ' + scrollMax);

        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);

                // // console.log('ScrollLeft: ' + element.scrollLeft);
                // if (element.scrollLeft > 0) {
                //     // console.log('Setting disableButtonLEFT = false');
                //     setLeft = false;
                // } else if (element.scrollLeft === 0) {
                //     // console.log('Setting disableButtonLEFT = true');
                //     setLeft = true;
                // }
                // if (element.scrollLeft >= scrollMax) {
                //     // console.log('Setting disableButtonRight = true');
                //     setRight = true;
                // } else if (element.scrollLeft < scrollMax) {
                //     // console.log('Setting disableButtonRight = false');
                //     setRight = false;
                // }

                // setDisableButton({ left: setLeft, right: setRight });
            }
        }, speed);
    };

    const ref = useRef(null);

    const ScrollButton = props => {
        const buttonBG =
            resolvedTheme === 'dark'
                ? 'forestgreenAlpha60.dark'
                : 'greyAlpha50.dark';

        const buttonColors =
            resolvedTheme === 'dark'
                ? { backgroundColor: buttonBG }
                : {
                      backgroundColor: buttonBG,
                      color: 'primary.contrastText',
                  };

        return (
            <IconButton
                onClick={() => {
                    sideScroll(ref.current, 10, 360, props.scrollStep);
                }}
                disabled={props.disabled}
                sx={{
                    // size: { xs: 'small', sm: 'large' },
                    // width: scrollButtonWidth,
                    // mx: { xs: '20px', sm: '.5vw' },
                    position: 'absolute',
                    justifyContent: props.justify,

                    [props.direction]: { xs: '35px', sm: '1vw' },
                    bottom: { xs: '8px', sm: 'unset' },
                    zIndex: 2,
                    // backgroundColor: buttonBG,
                    ...buttonColors,
                    '&:hover': {
                        color: 'primary.light',
                        backgroundColor: buttonBG,
                    },
                }}>
                {props.children}
            </IconButton>
        );
    };

    const ScrollSpacer = () => (
        <Box
            sx={{
                flexShrink: 0,
                width: { xs: 'calc(35px + 2vw)', sm: `40px` },
            }}
        />
    );

    return (
        <Box>
            <Typography
                variant="h4"
                component="p"
                sx={{
                    mt: { xs: 'calc(4rem + 4vw)', sm: '4rem', md: '3.5rem' },
                    mb: '1rem',
                    px: { xs: '1rem', sm: 0 },
                }}>
                {props.title}
            </Typography>
            <Paper
                className="gallery-container"
                variant="outlined"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: '2px',
                    borderRadius: '.4rem',
                    ...paperColors,
                    // backgroundColor: paperBG,
                    width: { xs: '108%', sm: 'inherit' },
                    ml: { xs: '-4%', sm: 'inherit' },
                    position: 'relative',
                }}>
                <Box
                    ref={ref}
                    onScroll={() => checkButtonsOnScroll(ref.current)}
                    sx={{
                        // display: 'flex',
                        // height: '100%',
                        width: '100%',
                        py: '2rem',
                        overflowX: 'scroll',
                        WebkitOverflowScrolling: 'touch',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            gap: '1.5rem',
                            width: '100%',
                            height: '100%',
                            px: '.5rem',
                            // mx: { xs: '13%', sm: 'calc(45px + 3vw)' },
                        }}>
                        <ScrollSpacer />
                        {props.children}
                        <Button
                            component={Link}
                            href={props.href}
                            size={'large'}
                            sx={{
                                flexShrink: 0,
                                transitionDuration: '50ms',
                                pl: '1.5rem',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    color: 'primary.light',
                                    backgroundColor: 'greyAlpha10.main',
                                },
                            }}>
                            More
                            <ArrowRightAltIcon
                                sx={{ pl: '.25rem', fontSize: '2rem' }}
                            />
                        </Button>
                        <ScrollSpacer />
                    </Box>
                </Box>
                <ScrollButton
                    direction={'left'}
                    justify={'flex-end'}
                    scrollStep={-25}
                    disabled={disableButton.left}>
                    <ArrowBackIosNewIcon fontSize={isXS ? 'medium' : 'large'} />
                </ScrollButton>
                <ScrollButton
                    direction={'right'}
                    justify={'flex-start'}
                    scrollStep={25}
                    disabled={disableButton.right}>
                    <ArrowForwardIosIcon fontSize={isXS ? 'medium' : 'large'} />
                </ScrollButton>
            </Paper>
        </Box>
    );
}
