import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .matches(/^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email'),
  password: Yup.string().required('Password is required'),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .matches(/^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email'),
});

export const resetPasswordSchema = Yup.object().shape({
  otpToken: Yup.string()
    .required('OTP is required')
    .matches(/^\d{6}$/, 'OTP must be a 4-digit number'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*/\\])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
});

export const contactFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .matches(/^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email'),
  name: Yup.string().required('Name is required'),
  message: Yup.string().required('Message is required'),
});
