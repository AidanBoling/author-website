'use client';
// import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ContactForm from '../ContactForm';

function Contact() {
    // const [formData, setField] = useState({
    //     fName: '',
    //     lName: '',
    //     email: '',
    //     message: '',
    // });

    // function handleChange(event) {
    //     const { id, value, required } = event.target;
    //     // console.log(event.target);
    //     setField({ ...formData, [id]: value });
    //     validateField(id, value, required);
    //     // if (id === 'email' || required) {
    //     //     validateField(id, value, required);
    //     // }
    // }

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     console.log('Data:\n', formData);
    //     setSubmitted(true);
    //     const formIsValid = validateForm();
    //     console.log('Form is valid: ' + formIsValid);
    //     // const validated = validateFields();
    //     //validate email
    //     //check email; if not valid, setIsValidEmail(false)
    //     // if (validated) {//submit form}
    // }

    return (
        <Box>
            <Box mx={'2rem'}>
                <Typography mt={'2rem'} mb={'4rem'}>
                    Lorem ipsum dolor sit amet...
                </Typography>
            </Box>

            <Paper sx={{ p: '2rem' }}>
                <ContactForm />
            </Paper>
        </Box>
    );
}

export default Contact;
