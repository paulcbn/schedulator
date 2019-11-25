import { Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';

const StaticTables = () => {
  return <Layout>
    <Typography>No static tables yet :c</Typography>
  </Layout>;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StaticTables);
