'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Typography, Link as MuiLink, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
// import { useTheme } from '@mui/material/styles';

// @media (prefers-reduced-motion: reduce) {
//     .btn {
//       transition: none;
//     }
//   }

const NavButtonBase = styled(ButtonBase)(() => ({
    position: 'relative',
    height: 50,
    borderRadius: '.5rem',
    '&.isActive': {
        '& .NavUnderline': {
            opacity: 0.65,
            transform: 'scaleX(1.20)',
        },
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .NavUnderline': {
            opacity: 0.65,
            transform: 'scaleX(1.20)',
        },
    },
    '&.isClicked': {
        '& .NavUnderline': {
            opacity: 0.9,
            transform: 'scaleX(1.30)',
        },
    },
}));

const NavUnderlined = styled('span')(({ width, theme }) => ({
    height: 1.5,
    width: `calc(${width} / 1.20)`,
    backgroundColor: theme.palette.lightgold.light,
    position: 'absolute',
    bottom: 0,
    left: `calc(50% - calc(${width} / 2.4))`,
    opacity: 0,
    transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shorter,
    }),
}));

export function NavButton({ page }) {
    const [active, setActive] = useState(false);
    const [clicked, setClicked] = useState(false);
    const pathname = usePathname();
    const navTextStyles = {
        fontWeight: '300',
        fontSize: '1.1rem',
        letterSpacing: '.02rem',
    };
    const ulWidth = page.name.length + 2;

    useEffect(() => {
        if (
            page.name.toLowerCase() !== 'home' &&
            pathname.startsWith(page.link)
        ) {
            if (!active) {
                setActive(true);
            }
        } else {
            if (active) {
                setActive(false);
            }
        }
    }, [pathname]);

    function handleClick() {
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 110);
    }

    return (
        <NavButtonBase
            disableRipple
            component={Link}
            href={page.link}
            zIndex={1}
            underline="none"
            ulWidth={`${ulWidth}ch`}
            onMouseDown={handleClick}
            onTouchStart={handleClick}
            className={(active && 'isActive') + ' ' + (clicked && 'isClicked')}>
            <Typography
                component="span"
                color="inherit"
                sx={{
                    position: 'relative',
                    px: 2,
                    pt: 0,
                    pb: 0.3,
                    mb: 0,
                    ...navTextStyles,
                }}>
                {page.name}
                <NavUnderlined
                    className="NavUnderline"
                    width={`${ulWidth}ch`}
                />
            </Typography>
        </NavButtonBase>
    );
}
