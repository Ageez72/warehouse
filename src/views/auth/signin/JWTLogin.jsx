import React, {useEffect} from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { BASE_URL } from 'config/constant';

const JWTLogin = () => {
  const loginUrl = BASE_URL + 'login';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (token && role === 'Super Admin') {
      console.log('token', token);
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const response = await axios.post(
            loginUrl,
            {
              email: values.email,
              password: values.password
            },
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }
          );
      
          // ✅ Handle success
          console.log('Login successful:', response.data);
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('role', response.data.data.role.name);

      
          setStatus({ success: true });
          setSubmitting(false);
      
          // Optionally redirect
          if (response.data.data.role.name === 'Super Admin') {
            window.location.href = '/dashboard';
          }
      
        } catch (error) {
          console.error('Login failed:', error);
          setStatus({ success: false });
          setErrors({
            submit: error.response?.data?.message || 'Something went wrong, please try again.'
          });
          setSubmitting(false);
        }
      }}
      
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              name="email"
              placeholder="Email Address"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>

          <div className="form-group mb-4">
            <input
              className="form-control"
              name="password"
              placeholder="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          <div className="custom-control custom-checkbox text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert variant="danger">{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col>
              <Button
                className="btn-block mb-4"
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="primary"
              >
                Sign In
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
