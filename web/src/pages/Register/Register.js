import { Container, Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';

import { Redirect, useHistory } from 'react-router-dom';
import useStyles from './styles';

import { auth } from '../../lib/actions';


const Register = ({errors, isAuthenticated, register}) => {
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

  return <>
    <Container maxWidth="sm" className={ classes.loginContainer }>
      <form onSubmit={ handleSubmit }>
        <Paper className={ classes.loginPaper }>
          <Typography variant="h2">
            Schedulator
          </Typography>
          <TextField variant="outlined" label="Email"
                     error={ !!errors['email'] }
                     helperText={ errors['email'] }
                     type="email"
                     onChange={ event => setEmail(event.target.value) }
                     value={ email }
                     className={ classes.loginInput }
          />
          <Box className={ classes.nameBox }>
            <TextField variant="outlined" label="First name"
                       onChange={ event => setFirstName(event.target.value) }
                       error={ !!errors['first_name'] }
                       helperText={ errors['first_name'] }
                       value={ firstName }
                       className={ classes.loginInput }
            />
            <TextField variant="outlined" label="Last name"
                       onChange={ event => setLastName(event.target.value) }
                       error={ !!errors['last_name'] }
                       helperText={ errors['last_name'] }
                       value={ lastName }
                       className={ classes.loginInput }
            />
          </Box>
          <TextField variant="outlined" label="Password"
                     type="password"
                     error={ !!errors['password'] }
                     helperText={ errors['password'] }
                     onChange={ event => setPassword(event.target.value) }
                     value={ password }
                     className={ classes.loginInput }

          />
          <TextField variant="outlined" label="Password confirmation"
                     type="password"
                     error={ !!errors['confirm_password'] }
                     helperText={ errors['confirm_password'] }
                     onChange={ event => setPasswordConfirm(event.target.value) }
                     value={ passwordConfirm }
                     className={ classes.loginInput }

          />

          <Box className={ classes.buttonBox }>
            <Button variant="contained" size="large" color="primary" type="submit">Register</Button>
            <Button variant="contained" size="large" color="default" type="button"
                    onClick={ () => history.push('/login') }>Login</Button>
          </Box>
        </Paper>

      </form>
    </Container>
  </>;

};


const mapStateToProps = state => {
  let errors = {...state.auth.errors};
  if (errors['non_field_errors'])
    errors['confirm_password']=errors['non_field_errors'];
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (email, password, passwordConfirm, firstName, lastName) => dispatch(auth.register(email, password, passwordConfirm, firstName, lastName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
