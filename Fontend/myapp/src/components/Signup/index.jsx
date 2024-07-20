import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setStatus({ error: data.message || 'Signup failed' });
      }
    } catch (error) {
      setStatus({ error: 'An error occurred. Please try again.' });
    }

    setSubmitting(false);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>Sign Up</h2>
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className={styles.inputGroup}>
                <Field type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="div" className={styles.errorMessage} />
              </div>
              <div className={styles.inputGroup}>
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className={styles.errorMessage} />
              </div>
              <div className={styles.inputGroup}>
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className={styles.errorMessage} />
              </div>
              <div className={styles.inputGroup}>
                <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                <ErrorMessage name="confirmPassword" component="div" className={styles.errorMessage} />
              </div>
              <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
              {status && status.error && (
                <div className={styles.errorMessage}>{status.error}</div>
              )}
            </Form>
          )}
        </Formik>
        <p className={styles.switchForm}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;