import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import { staticTimetables } from '../../lib/actions';
import HierarchyView from './HierarchyView';
import { useOtherSectionStyles } from './styles';

const OtherSection = ({ loadStaticTimetableHierarchy, hierarchy, loading }) => {
  const { sectionId } = useParams();
  const history = useHistory();
  const classes = useOtherSectionStyles();
  useEffect(() => {
    loadStaticTimetableHierarchy(+sectionId);
  }, [ loadStaticTimetableHierarchy, sectionId ]);

  const handleClick = (searchId) => {
    history.push(`/static-timetables/${ searchId }`);
  };

  if (loading)
    return <Layout otherLabel={ 'Alege formatia' }> <CircularProgress/> </Layout>;

  return <Layout otherLabel={ 'Alege formatia' }>
    <Box className={ classes.paddingTopBox }>
      <HierarchyView staticTimetableHierarchy={ hierarchy } showTitle={ true } onClick={ handleClick }/>
    </Box>
  </Layout>;
};

const mapStateToProps = state => {
  return {
    hierarchy: state.staticTimetables.staticTimetableHierarchy,
    loading: state.staticTimetables.staticTimetableHierarchyLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadStaticTimetableHierarchy: (sectionId) => {
      return dispatch(staticTimetables.loadStaticTimetableHierarchy(sectionId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherSection);
