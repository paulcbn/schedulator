import { Container, Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Redirect, useHistory } from 'react-router-dom';
import useStyles from './styles';

import { auth } from '../../lib/actions';
import { clearErrors } from '../../lib/actions/auth';


const Register = ({ errors, isAuthenticated, register, clearErrors }) => {
  let history = useHistory();
  const [ password, setPassword ] = useState('');
  const [ passwordConfirm, setPasswordConfirm ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');

  const classes = useStyles();

  if (isAuthenticated)
    return <Redirect to="/"/>;

  function handleSubmit(event) {
    event.preventDefault();
    register(email, password, passwordConfirm, firstName, lastName);
  }

  function navigateToLogin() {
    clearErrors(); //we do this so that when we change the page errors from redux don't affect that page also
    history.push('/login');
  }

  return <>
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

          <Box className={ classes.buttonBox }>
            <Button variant="contained" size="large" color="primary" type="submit">Register</Button>
            <Button variant="contained" size="large" color="default" type="button"
                    onClick={ navigateToLogin }>Login</Button>
          </Box>
        </Paper>

      </form>
    </Container>
  </>;
};


const mapStateToProps = state => {
  let errors = { ...state.auth.errors };
  if (errors.nonFieldErrors)
    errors.confirmPassword = errors.nonFieldErrors;
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (email, password, passwordConfirm, firstName, lastName) => dispatch(auth.register(email, password, passwordConfirm, firstName, lastName)),
    clearErrors: () => {
      return dispatch(clearErrors());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
