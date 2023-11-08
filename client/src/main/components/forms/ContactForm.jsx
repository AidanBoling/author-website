'use client';
import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
import { Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { useForm } from 'react-hook-form';
import { sendFormData } from '../../api/sendFormData';
import FormSubmitSuccessScreen from '@/main/components/forms/FormSubmitSuccessScreen';

// TODO (later): turn submit button into progress button
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

        function submitAction(res) {
            // console.log(res);

            if (res.status === 200) {
                formContext.reset();
                setSendSuccessful(true);
            } else {
                setSendError(true);
            }
        }

        try {
            sendFormData(formData, 'contact').then(res => {
                submitAction(res);
            });
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
                        {/* <Grid xs={12} sm={6}>
                            <TextFieldElement
                                name="fName"
                                label="First Name"
                                variant="outlined"
                                size="small"
                                required
                            />
                        </Grid> */}
                        <Grid xs={12} sm={6}>
                            <TextFieldElement
                                name="name"
                                label="Name"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextFieldElement
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                size="small"
                                required
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextFieldElement
                                name="message"
                                label="Message"
                                variant="outlined"
                                size="small"
                                multiline
                                rows={8}
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
                <FormSubmitSuccessScreen
                    imgSize={100}
                    mainMessage={'Thank you!'}
                    mainMessageVariant={'h3'}
                    messageMY={'2rem'}
                    py={'15vh'}
                />
            )}
        </>
    );
}
