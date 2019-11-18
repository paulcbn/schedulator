import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom';
import {Container, Paper, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import useStyles from './styles';
import {auth} from '../../lib/actions';
import {clearErrors} from "../../lib/actions/auth";

const Login = ({errors, isAuthenticated, login, clearErrors}) => {
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  if (isAuthenticated)
    return <Redirect to="/"/>;

  function handleSubmit(event) {
    event.preventDefault();
    login(email, password);
  }

  function navigateToRegister() {
    clearErrors(); //we do this so that when we change the page errors from redux don't affect that page also
    history.push('/register');
  }

  return <>
    <Container maxWidth="sm" className={classes.loginContainer}>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.loginPaper}>
          <Typography variant="h2">
            Schedulator
          </Typography>
          <TextField variant="outlined" label="Email"
                     error={!!errors['email']}
                     helperText={errors['email']}
                     onChange={event => setEmail(event.target.value)}
                     value={email}
                     className={classes.loginInput}
          />
          <TextField variant="outlined" label="Password"
                     error={!!errors['password']}
                     helperText={errors['password']}
                     type="password"
                     onChange={event => setPassword(event.target.value)}
                     value={password}
                     className={classes.loginInput}

          />

          <Box className={classes.buttonBox}>
            <Button variant="contained" size="large" color="primary" type="submit">Login</Button>
            <Button variant="contained" size="large" color="default" type="button"
                    onClick={navigateToRegister}>Register</Button>
          </Box>
        </Paper>


      </form>
    </Container>
  </>;

};

const mapStateToProps = state => {
  let errors = {...state.auth.errors};
  if (errors['non_field_errors']) {
    errors['password'] = errors['non_field_errors'];
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      return dispatch(auth.login(email, password));
    },
    clearErrors: () => {
      return dispatch(clearErrors())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
