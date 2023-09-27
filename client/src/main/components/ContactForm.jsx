'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { useForm, useWatch } from 'react-hook-form';
import { sendFormData } from '../api/sendFormData';

export default function ContactForm() {
    const formContext = useForm({
        // defaultValues: {
        //     name: '',
        // },
    });

    function handleSubmit(formData) {
        // event.preventDefault();
        console.log('Data:\n', formData);

        try {
            const res = sendFormData(formData, 'contact');
            if (res) {
                formContext.reset();
            }
        } catch (error) {
            console.error('Error ', error);
        }
    }

    return (
        <FormContainer
            formContext={formContext}
            onSuccess={data => handleSubmit(data)}>
            <Grid
                className="contactform"
                // component="form"
                container
                spacing={3}
                // onSubmit={handleSubmit}
            >
                <Grid xs={12} sm={6}>
                    <TextFieldElement
                        name="fName"
                        label="First Name"
                        variant="outlined"
                    />
                </Grid>
                <Grid xs={12} sm={6}>
                    <TextFieldElement
                        name="lName"
                        label="Last Name"
                        variant="outlined"
                    />
                </Grid>
                <Grid xs={12}>
                    <TextFieldElement
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid xs={12}>
                    <TextFieldElement
                        name="message"
                        label="Message"
                        multiline
                        rows={8}
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid xs={3} ml={'auto'}>
                    <Button
                        // component={Link}
                        variant="contained"
                        type="submit"
                        // disabled={!watchEmail}
                        // href="#"
                        size="large"
                        ml={'auto'}
                        sx={{ width: '100%' }}
                        // onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </FormContainer>
    );
}
