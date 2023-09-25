'use client';
// import { useState } from 'react';
import { Box, Grid, Paper, Typography, TextField } from '@mui/material';

function Contact() {
    return (
        <div>
            <Typography>Lorem ipsum dolor sit amet...</Typography>
            <Paper>
                <Grid container spacing={2} sx={{ p: '2rem' }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="contactFName"
                            label="First Name"
                            variant="outlined"
                            width={'100%'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="contactLName"
                            label="Last Name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="contactEmail"
                            label="Email"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="contactMessage"
                            label="Message"
                            multiline
                            maxRows={8}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Contact;
