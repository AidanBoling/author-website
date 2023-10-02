'use client';

import { useState, useRef } from 'react';
// import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { useForm } from 'react-hook-form';
import { sendFormData } from '../api/sendFormData';
// import greenCheckmark from '../../assets/check_mark_green.png';
import FormSubmitSuccessScreen from '@/main/components/FormSubmitSuccessScreen';

export default function SubscribeForm(props) {
    const [subscribeSuccessful, setSubscribeSuccessful] = useState(false);
    const [subscribeError, setSubscribeError] = useState(false);

    const formContext = useForm({});

    async function handleSubmit(formData) {
        console.log('Data:\n', formData);
        setSubscribeError(false);

        try {
            sendFormData(formData, 'subscribe').then(res => {
                submitAction(res);
            });

            function submitAction(res) {
                // console.log(res);

                if (res.status === 200) {
                    formContext.reset();
                    setSubscribeSuccessful(true);
                } else {
                    setSubscribeError(true);
                }
            }
        } catch (error) {
            console.error('Error ', error);
            setSubscribeError(true);
        }
    }

    return (
        <>
            {!subscribeSuccessful ? (
                <FormContainer
                    formContext={formContext}
                    onSuccess={data => handleSubmit(data)}>
                    <Grid className="contactform" container spacing={3}>
                        <Grid xs={12}>
                            <TextFieldElement
                                name="fName"
                                label="First Name"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid xs={12}>
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
                                autoCapitalize="off"
                                autoCorrect="off"
                                required
                            />
                        </Grid>
                        <Grid
                            xs={3}
                            sx={{
                                display: 'flex',
                                justifyContent: { md: 'center' },
                                mx: { md: 'auto' },
                            }}>
                            <Button
                                variant="contained"
                                type="submit"
                                size={props.buttonSize}
                                sx={{
                                    flexShrink: 0,
                                    // width: '100%',
                                    width: '125px',
                                }}>
                                Subscribe
                            </Button>
                        </Grid>
                        {subscribeError && (
                            <Grid xs={12}>
                                <Typography color="error">
                                    Sorry, there was an error subscribing to the
                                    newsletter. Try again in a moment, or email
                                    me at planetgoatpress@gmail.com and I'll add
                                    you the old fashioned way.`
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </FormContainer>
            ) : (
                <FormSubmitSuccessScreen
                    imgSize={50}
                    mainMessage={'Success!'}
                    mainMessageVariant={'h5'}
                    secondaryMessage={
                        "You've been subscribed to the newsletter, and should receive a confirmation email shortly."
                    }
                    messageMY={'1.5rem'}
                    py={'5vh'}
                />
            )}
        </>
    );
}
//   return (
//     <form onSubmit={subscribeUser}>
//       <label htmlFor="email-input" className="form__label">
//         Your Best Email
//       </label>

//       <input
//         type="email"
//         id="email-input"
//         name="email"
//         // placeholder="your best email"
//         ref={inputRef}
//         required
//         autoCapitalize="off"
//         autoCorrect="off"
//       />

//       <button type="submit" value="" name="subscribe">
//         Subscribe
//       </button>
//     </form>
//   );
// }
