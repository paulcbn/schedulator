import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { deepGet } from '../../lib';
import { staticTables } from '../../lib/actions';
import { useHistory } from 'react-router-dom';
import SectionTable from './SectionTable';

const OtherSections = ({ loadSections, sections, sectionsLoading }) => {
  const history = useHistory();
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

  const handleClick = (section) => {
    const id = deepGet(section, 'id');
    if (id === undefined) return;
    history.push(`/other-sections/${ id }`);
  };

  return <Layout>
    <SectionTable
      title={ 'Licenta' }
      sections={ bachelorSections }
      loading={ sectionsLoading }
      onClick={ handleClick }/>
    <SectionTable
      title={ 'Master' }
      sections={ masterSections }
      loading={ sectionsLoading }
      onClick={ handleClick }/>
  </Layout>;
};

const mapStateToProps = state => {
  return {
    sections: state.staticTables.sections,
    sectionsLoading: state.staticTables.sectionsLoading,
    sectionsErrors: state.staticTables.sectionsErrors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSections: () => {
      return dispatch(staticTables.loadSections());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherSections);
