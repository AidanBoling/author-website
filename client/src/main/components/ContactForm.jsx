'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { useForm, useWatch } from 'react-hook-form';
import { sendFormData } from '../api/sendFormData';
import greenCheckmark from '../../assets/check_mark_green.png';

export default function ContactForm() {
    const [sendSuccessful, setSendSuccessful] = useState(false);
    const [sendError, setSendError] = useState(false);
    const formContext = useForm({
        // defaultValues: {
        //     name: '',
        // },
    });

    async function handleSubmit(formData) {
        // event.preventDefault();
        console.log('Data:\n', formData);
        setSendError(false);

        try {
            sendFormData(formData, 'contact').then(res => {
                submitAction(res);
            });

            function submitAction(res) {
                // console.log(res);

                if (res.status === 200) {
                    formContext.reset();
                    setSendSuccessful(true);
                } else {
                    setSendError(true);
                }
            }
        } catch (error) {
            console.error('Error ', error);
            setSendError(true);
        }
    }

    return (
        <>
            {!sendSuccessful ? (
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
                                required
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
                        {sendError && (
                            <Grid xs={12}>
                                <Typography color="error">
                                    Sorry, something went wrong. Please wait a
                                    moment, then try submitting again.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </FormContainer>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: '15vh',
                    }}>
                    <Image
                        src={greenCheckmark}
                        width={100}
                        height={100}
                        alt="a green checkmark"
                    />

                    <Typography component="p" variant="h3" sx={{ my: '2rem' }}>
                        Thank you!
                    </Typography>
                </Box>
            )}
        </>
    );
}
