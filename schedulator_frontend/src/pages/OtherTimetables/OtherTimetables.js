import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { staticTimetables } from '../../lib/actions';
import { deepGet } from '../../lib/utils';
import SectionTable from './SectionTable';
import useStyles from './styles';
import SubjectSearchView from './SubjectSearchView';
import TeacherSearchView from './TeacherSearchView';

const OtherTimetables = ({ loadSections, sections, sectionsLoading }) => {
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    loadSections();
  }, [ loadSections ]);

  const [ bachelorSections, masterSections ] = useMemo(() => {
    let bachelor = [];
    let master = [];
    sections.forEach(section => {
      if (deepGet(section, 'type', 'B') === 'M')
        master.push(section);
      else
        bachelor.push(section);
    });
    return [ bachelor, master ];
  }, [ sections ]);

  const handleSelectSection = (section) => {
    const id = deepGet(section, 'id');
    if (id === undefined) return;
    history.push(`/sections/${ id }`);
  };

  return <Layout>
    <Typography variant={ 'h4' } className={ classes.header }>Orarul altor formatii</Typography>
    <Divider/>
    <SectionTable
      title={ 'Licenta' }
      sections={ bachelorSections }
      loading={ sectionsLoading }
      onClick={ handleSelectSection }/>
    <SectionTable
      title={ 'Master' }
      sections={ masterSections }
      loading={ sectionsLoading }
      onClick={ handleSelectSection }/>
    <Typography variant={ 'h4' } className={ classes.header }>Orarul unei materii</Typography>
    <Divider/>
    <SubjectSearchView/>
    <Typography variant={ 'h4' } className={ classes.header }>Orarul unui profesor</Typography>
    <Divider/>
    <TeacherSearchView/>
  </Layout>;
};

const mapStateToProps = state => {
  return {
    sections: state.staticTimetables.sections,
    sectionsLoading: state.staticTimetables.sectionsLoading,
    sectionsErrors: state.staticTimetables.sectionsErrors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSections: () => {
      return dispatch(staticTimetables.loadSections());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherTimetables);
