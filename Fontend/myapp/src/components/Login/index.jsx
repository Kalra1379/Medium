import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.css';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setStatus({ error: data.message || 'Login failed' });
      }
    } catch (error) {
      setStatus({ error: 'An error occurred. Please try again.' });
    }

    setSubmitting(false);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className={styles.inputGroup}>
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className={styles.errorMessage} />
              </div>
              <div className={styles.inputGroup}>
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className={styles.errorMessage} />
              </div>
              <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              {status && status.error && (
                <div className={styles.errorMessage}>{status.error}</div>
              )}
            </Form>
          )}
        </Formik>
        <p className={styles.switchForm}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;