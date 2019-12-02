import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import { staticTables } from '../../lib/actions';
import HierarchyView from './HierarchyView';
import { useOtherSectionStyles } from './styles';

const OtherSection = ({ loadStaticTableHierarchy, hierarchy, loading }) => {
  const { sectionId } = useParams();
  const history = useHistory();
  const classes = useOtherSectionStyles();
  useEffect(() => {
    loadStaticTableHierarchy(+sectionId);
  }, [ loadStaticTableHierarchy, sectionId ]);

  const handleClick = (searchId) => {
    history.push(`/static-tables/${ searchId }`);
  };

  if (loading)
    return <Layout otherLabel={ 'Alege formatia' }> <CircularProgress/> </Layout>;

  return <Layout otherLabel={ 'Alege formatia' }>
    <Box className={ classes.paddingTopBox }>
      <HierarchyView staticTableHierarchy={ hierarchy } showTitle={ true } onClick={ handleClick }/>
    </Box>
  </Layout>;
};

const mapStateToProps = state => {
  return {
    hierarchy: state.staticTables.staticTableHierarchy,
    loading: state.staticTables.staticTableHierarchyLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadStaticTableHierarchy: (sectionId) => {
      return dispatch(staticTables.loadStaticTableHierarchy(sectionId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherSection);
