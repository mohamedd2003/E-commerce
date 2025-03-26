import * as Yup from 'yup';

// Regular expression for validating email format
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Regular expression for password validation (example: at least one uppercase, one lowercase, one number, and one special character)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name cannot exceed 50 characters'),

  email: Yup.string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});

export const loginSchema = Yup.object({


  email: Yup.string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),


});





