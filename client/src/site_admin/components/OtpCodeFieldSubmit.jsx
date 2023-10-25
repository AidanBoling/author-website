'use client';
import { TextField, Button, Stack } from '@mui/material';

export default function OtpCodeField(props) {
    return (
        <>
            <Stack
                gap={4}
                sx={{ margin: '2rem', mt: '1rem', maxWidth: '250px' }}>
                <TextField
                    variant="outlined"
                    name="code"
                    // type="password"
                    value={props.control}
                    label="OTP Code"
                    onChange={props.onChange}
                />
                {props.includeSubmit && (
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                )}
            </Stack>
        </>
    );
}
