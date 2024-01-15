import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

import { setAuthentication } from 'pages/UI/Bootstrap/AdminLTE/store/reducers/auth';
import { setWindowClass } from 'pages/UI/Bootstrap/AdminLTE/utils/helpers';
import { PfCheckbox, PfButton } from '@profabric/react-components';
import * as Yup from 'yup';

import {
  GoogleProvider,
  authLogin,
  facebookLogin,
} from 'pages/UI/Bootstrap/AdminLTE/utils/oidc-providers';
import { Form, InputGroup } from 'react-bootstrap';

const Login = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const [isGoogleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [isFacebookAuthLoading, setFacebookAuthLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  

  const login = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      const response = await authLogin(email, password);
      dispatch(setAuthentication(response as any));
      toast.success('Login is succeed!');
      setAuthLoading(false);
      // dispatch(loginUser(token));
      navigate('/');
    } catch (error: any) {
      setAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };

  const loginByGoogle = async () => {
    try {
      setGoogleAuthLoading(true);
      const response = await GoogleProvider.signinPopup();
      dispatch(setAuthentication(response as any));
      toast.success('Login is succeeded!');
      setGoogleAuthLoading(false);
      navigate('/');
    } catch (error: any) {
      setGoogleAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };

  const loginByFacebook = async () => {
    try {
      setFacebookAuthLoading(true);
      const response = await facebookLogin();
      dispatch(setAuthentication(response as any));
      setFacebookAuthLoading(false);
      navigate('/');
    } catch (error: any) {
      setFacebookAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
          .min(8, 'Must be at least 8 characters')
          .max(20, 'Must be less  than 20 characters')
          .required('Username is required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      login(values.username, values.password);
    },
  });

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>React</b>
            <span>Boot</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">login.label.signIn</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="username"
                  name="username"
                  type="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={values.username}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && !!errors.username}
                />
                {touched.username && errors.username ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-envelope" />
                    </InputGroup.Text>
                  </InputGroup>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup>
                )}
              </InputGroup>
            </div>

            <div className="row">
              <div className="col-8">
                <PfCheckbox checked={false}>
                  login.label.rememberMe
                </PfCheckbox>
              </div>
              <div className="col-4">
                <PfButton
                  block
                  type="submit"
                  loading={isAuthLoading}
                  disabled={isFacebookAuthLoading || isGoogleAuthLoading}
                >
                  login.button.signIn.label
                </PfButton>
              </div>
            </div>
          </form>
          <div className="social-auth-links text-center mt-2 mb-3">
            <PfButton
              block
              className="mb-2"
              onClick={loginByFacebook}
              loading={isFacebookAuthLoading}
              disabled={isAuthLoading || isGoogleAuthLoading}
            >
              <i className="fab fa-facebook mr-2" />
              login.button.signIn.social
            </PfButton>
            <PfButton
              block
              theme="danger"
              onClick={loginByGoogle}
              loading={isGoogleAuthLoading}
              disabled={isAuthLoading || isFacebookAuthLoading}
            >
              <i className="fab fa-google mr-2" />
              login.button.signIn.social
            </PfButton>
          </div>
          <p className="mb-1">
            <Link to="/forgot-password">
              login.label.forgotPass
            </Link>
          </p>
          <p className="mb-0">
            <Link to="/register" className="text-center">
              login.label.registerNew
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
