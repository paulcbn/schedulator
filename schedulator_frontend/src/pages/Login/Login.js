import { Container, Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { auth } from '../../lib/actions';

import useStyles from './styles';


const Login = ({ errors, loading, isAuthenticated, login }) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ captcha, setCaptcha ] = useState('');
  const classes = useStyles({ captchaError: errors.captcha });
  const captchaRef = useRef();
  useEffect(() => {
    if (captchaRef.current !== null && captchaRef.current !== undefined)
      captchaRef.current.reset();
  }, [ captchaRef, errors ]);


  function handleSubmit(event) {
    event.preventDefault();
    login(username, password, captcha);
  }

  if (isAuthenticated)
    return <Redirect to="/"/>;

  return <Layout>
    <Container maxWidth="sm" className={ classes.loginContainer }>
      <form onSubmit={ handleSubmit }>
        <Paper className={ classes.loginPaper }>
          <Typography variant="h2">
            Schedulator
          </Typography>
          <TextField variant="outlined" label="Username (de scs)"
                     error={ !!errors.username }
                     helperText={ errors.username }
                     onChange={ event => setUsername(event.target.value) }
                     value={ username }
                     className={ classes.loginInput }
          />
          <TextField variant="outlined" label="Password"
                     error={ !!errors.password }
                     helperText={ errors.password }
                     type="password"
                     onChange={ event => setPassword(event.target.value) }
                     value={ password }
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
            <Button variant="contained" size="large" color="primary" type="submit">Login</Button>
            <Typography color={ 'textSecondary' } component='div'>
              Pentru sugestii: <Typography className={ classes.email }>schedulator.suggestions@gmail.com</Typography>
            </Typography>
          </Box>
        </Paper>
      </form>
    </Container>
  </Layout>;

};

const mapStateToProps = state => {
  let errors = { ...state.auth.loginErrors };
  if (errors.nonFieldErrors)
    errors.password = errors.nonFieldErrors;
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loginLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password, captcha) => {
      return dispatch(auth.login(username, password, captcha));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
