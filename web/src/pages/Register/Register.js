import { Container, Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { connect } from 'react-redux';

import { Redirect, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import useStyles from './styles';

import { auth } from '../../lib/actions';


const Register = ({ errors, isAuthenticated, register, loading }) => {
  let history = useHistory();
  const [ password, setPassword ] = useState('');
  const [ passwordConfirm, setPasswordConfirm ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ captcha, setCaptcha ] = useState('');

  const captchaRef = useRef();
  const classes = useStyles({ captchaError: errors.captcha });

  useEffect(() => {
    if (captchaRef.current !== null && captchaRef.current !== undefined)
      captchaRef.current.reset();
  }, [ captchaRef, errors ]);


  if (isAuthenticated)
    return <Redirect to="/"/>;

  function handleSubmit(event) {
    event.preventDefault();
    register(email, password, passwordConfirm, firstName, lastName, captcha);
  }

  function navigateToLogin() {
    history.push('/login');
  }


  return <Layout otherLabel={ 'register' }>
    <Container maxWidth="sm" className={ classes.loginContainer }>
      <form onSubmit={ handleSubmit }>
        <Paper className={ classes.loginPaper }>
          <Typography variant="h2">
            Schedulator
          </Typography>
          <TextField variant="outlined" label="Email"
                     error={ !!errors.email }
                     helperText={ errors.email }
                     type="email"
                     onChange={ event => setEmail(event.target.value) }
                     value={ email }
                     className={ classes.loginInput }
          />
          <Box className={ classes.nameBox }>
            <TextField variant="outlined" label="First name"
                       onChange={ event => setFirstName(event.target.value) }
                       error={ !!errors.firstName }
                       helperText={ errors.firstName }
                       value={ firstName }
                       className={ classes.loginInput }
            />
            <TextField variant="outlined" label="Last name"
                       onChange={ event => setLastName(event.target.value) }
                       error={ !!errors.lastName }
                       helperText={ errors.lastName }
                       value={ lastName }
                       className={ classes.loginInput }
            />
          </Box>
          <TextField variant="outlined" label="Password"
                     type="password"
                     error={ !!errors.password }
                     helperText={ errors.password }
                     onChange={ event => setPassword(event.target.value) }
                     value={ password }
                     className={ classes.loginInput }

          />
          <TextField variant="outlined" label="Password confirmation"
                     type="password"
                     error={ !!errors.confirmPassword }
                     helperText={ errors.confirmPassword }
                     onChange={ event => setPasswordConfirm(event.target.value) }
                     value={ passwordConfirm }
                     className={ classes.loginInput }

          />
          <Box className={ classes.captchaAndLoadingBox }>
            { process.env.REACT_APP_RECAPTCHA_SITE_KEY &&
            <Box className={ classes.captchaBox }>
              <ReCAPTCHA
                ref={ captchaRef }
                size='normal'
                style={ { display: 'inline-block' } }
                sitekey={ process.env.REACT_APP_RECAPTCHA_SITE_KEY }
                onChange={ setCaptcha }
              />
              { errors.captcha && <Typography color={ 'error' }>{ errors.captcha }</Typography> }

            </Box> }
            { loading && <CircularProgress style={ { justifySelf: 'space-between' } }/> }
          </Box>
          <Box className={ classes.buttonBox }>
            <Button variant="contained" size="large" color="primary" type="submit">Register</Button>
            <Button variant="contained" size="large" color="default" type="button"
                    onClick={ navigateToLogin }>Login</Button>
          </Box>
        </Paper>
      </form>
    </Container>
  </Layout>;
};

const mapStateToProps = state => {
  let errors = { ...state.auth.registerErrors };
  if (errors.nonFieldErrors)
    errors.confirmPassword = errors.nonFieldErrors;
  return {
    errors,
    loading: state.auth.registerLoading,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (email, password, passwordConfirm, firstName, lastName, captcha) => dispatch(auth.register(email, password, passwordConfirm, firstName, lastName, captcha)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
