import { validationResult } from 'express-validator';

const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
});

export function handleValidationErrors(req, res, next) {
    const formFields = [
        'name',
        'email',
        'currentPassword',
        'password',
        'confirmPassword',
    ];

    try {
        const result = myValidationResult(req).throw();
        console.log('Validation result: ', result);
        next();
    } catch (errors) {
        let errorsObj = errors.mapped();
        let formErrors;

        console.log('Validation errors: ', errors.mapped());

        formFields.forEach(field => {
            if (field in errorsObj) {
                formErrors = { ...formErrors, [field]: errorsObj[field] };
            }
        });

        if (formErrors) {
            // If validated form fields, include field validation errors

            res.status(400).json({
                error: formErrors,
                errorType: 'validation',
            });
        } else {
            res.status(400).json({ message: 'Invalid request' });
        }
    }
}
