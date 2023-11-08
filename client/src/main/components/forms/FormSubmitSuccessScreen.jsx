'use client';

import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import greenCheckmark from '../../../assets/check_mark_green.png';

export default function FormSubmitSuccessScreen(props) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                py: props.py,
            }}>
            <Image
                src={greenCheckmark}
                width={props.imgSize}
                height={props.imgSize}
                alt="a green checkmark"
            />
            <Box sx={{ mt: props.messageMY }}>
                <Typography
                    component="p"
                    variant={props.mainMessageVariant}
                    textAlign={'center'}>
                    {props.mainMessage}
                </Typography>
                {props.secondaryMessage && (
                    <Typography textAlign={'center'} sx={{ mt: '1.25rem' }}>
                        {props.secondaryMessage}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
