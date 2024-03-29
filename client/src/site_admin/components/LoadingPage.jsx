'use client';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingPage({ isLoading }) {
    return (
        <Fade
            in={isLoading}
            style={{
                transitionDelay: isLoading ? '800ms' : '0ms',
            }}
            unmountOnExit>
            <CircularProgress />
        </Fade>
    );
}
