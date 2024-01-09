import * as yup from 'yup';

const usernameValidation = yup.string().required('Username is required');
const emailValidation = yup.string().email('Invalid email').required('Email is required');
const passwordValidation = yup.string().min(6, 'Password must be at least 6 characters').required('Password is required');

export const signUpFormValidationSchema = yup.object().shape({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
});


export const validateData = async (schema, data) => {
    return await schema.validate(data, { abortEarly: false });
}