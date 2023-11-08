'use client';
// import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ContactForm from '../forms/ContactForm';

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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mollis mauris scelerisque, varius sapien in, eleifend
                    magna. Mauris nulla dui, varius at pretium vitae, malesuada
                    id nisl. Fusce venenatis odio tellus, egestas porta velit
                    vehicula nec. Proin condimentum ultricies sem, eget molestie
                    metus accumsan eu. In venenatis erat mattis nibh iaculis
                    ornare.
                </Typography>
            </Box>

            <Paper sx={{ p: '2rem' }}>
                <ContactForm />
            </Paper>
        </Box>
    );
}

export default Contact;
