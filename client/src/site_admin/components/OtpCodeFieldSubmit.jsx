'use client';
import { Stack, TextField, Button, Typography } from '@mui/material';

export default function OtpCodeField(props) {
    return (
        <>
            <Stack gap={4} sx={{ mt: '1rem', maxWidth: '275px' }}>
                <TextField
                    variant="outlined"
                    name="code"
                    // type="password"
                    value={props.control}
                    label="OTP Code"
                    onChange={props.onChange}
                />
                {!props.noSubmit && (
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                )}

                {props.note && (
                    <Typography>
                        <i>Note</i>:
                        <br />
                        {props.note}
                    </Typography>
                )}
            </Stack>
        </>
    );
}
