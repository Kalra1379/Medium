import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './index.module.css';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters')
    .required('Message is required'),
});

const ContactForm = () => {
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus({ success: 'Message sent successfully!' });
        resetForm();
      } else {
        setStatus({ error: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setStatus({ error: 'An error occurred. Please try again later.' });
    }

    setSubmitting(false);
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.imageSection}>
        <img src="/path/to/your/image.jpg" alt="Contact Us" />
      </div>
      <div className={styles.formSection}>
        <h2>Contact Us</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className={styles.errorMessage} />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className={styles.errorMessage} />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message">Message</label>
                <Field as="textarea" id="message" name="message" />
                <ErrorMessage name="message" component="div" className={styles.errorMessage} />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {status && status.success && (
                <div className={styles.successMessage}>{status.success}</div>
              )}
              {status && status.error && (
                <div className={styles.errorMessage}>{status.error}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;