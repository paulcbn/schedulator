import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { useHistory } from 'react-router-dom';

const Preferences = () => {
  const history = useHistory();

  return <Layout otherLabel='Preferinte'>
    This page is WIP:
    <Button onClick={ () => {
      history.push('/preferences/initial-setup');
    } } color="secondary" variant="contained">Reseteaza orarul</Button>
    <Button onClick={ () => {
      history.push('/preferences/attendances');
    } } color="secondary" variant="contained">Materiile mele</Button>
  </Layout>;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
