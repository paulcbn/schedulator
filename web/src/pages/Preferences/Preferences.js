import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { useHistory } from 'react-router-dom';

const Preferences = () => {
  const history = useHistory();

  return <Layout>
    <Button onClick={ () => {
      history.push('/initial-setup');
    } } color="secondary" variant="contained">Init setup</Button>

  </Layout>;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
