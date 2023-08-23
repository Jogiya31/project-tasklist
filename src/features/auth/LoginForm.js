import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Form as BootstrapForm, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from './authSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const dispatch=useDispatch();
  const navigate =useNavigate();
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);

  const handleSubmit = (values) => {
    dispatch(authActions.login(values));  
  };

  useEffect(() => {
    if(isAuthenticated || sessionStorage.getItem('loggedIn')==="true")
    {
      navigate("/tasks");
    }
  }, [isAuthenticated])

  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-center" >
        <Col xs={12} md={6} className="center-card-container" >
          <Card className="login-Card">
            <h2>Login</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <BootstrapForm.Group controlId="email">
                    <BootstrapForm.Label>Email</BootstrapForm.Label>
                    <Field
                      type="email"
                      name="email"
                      as={BootstrapForm.Control}
                      isInvalid={errors.email && touched.email}
                    />
                    <ErrorMessage
                      name="email"
                      component={BootstrapForm.Control.Feedback}
                      type="invalid"
                    />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group controlId="password">
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <Field
                      type="password"
                      name="password"
                      as={BootstrapForm.Control}
                      isInvalid={errors.password && touched.password}
                    />
                    <ErrorMessage
                      name="password"
                      component={BootstrapForm.Control.Feedback}
                      type="invalid"
                    />
                  </BootstrapForm.Group>

                  <Button type="submit" variant="primary" className='mt-3'>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
