'use client';
import { Box, Stack, Typography } from '@mui/material';

function Events({ children }) {
    return (
        <>
            <Box sx={{ my: '2rem' }}>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    aliquam ac lacus sit amet consequat. Mauris congue blandit
                    metus. Phasellus elementum sapien quis lectus pharetra
                    rhoncus. Aenean consectetur, ipsum non pulvinar rutrum,
                    ligula enim consequat metus, nec ultricies ante ante sed
                    nunc. Mauris enim nunc, luctus nec erat vel, feugiat egestas
                    erat. Cras nec fringilla orci.
                </Typography>
            </Box>
            <Typography variant="h3" component="h3" mb="1.5rem" color="primary">
                Upcoming Events
            </Typography>
            <Stack spacing={3}>{children}</Stack>
        </>
    );
}

export default Events;
