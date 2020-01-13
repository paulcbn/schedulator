import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { API } from '../../lib';
import MenuItem from './MenuItem';
import useStyles from './styles';

const Preferences = () => {
  const history = useHistory();
  const classes = useStyles();
  const [ exportState, setExportState ] = useState({ loading: false, error: false });

  const handleNavigateToInitialSetup = () => history.push('/preferences/initial-setup');
  const handleNavigateToAttendances = () => history.push('/preferences/attendances');

  const handleDownloadExport = async () => { // this is hacky, i know.
    setExportState(oldState => ({ ...oldState, loading: true }));
    try {
      const { data } = await API.get('/api/export-own-timetable');
      const url = window.URL.createObjectURL(new Blob([ data ]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `schedulator.xml`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setExportState(oldState => ({ error: false, loading: false }));
    } catch (e) {
      setExportState(oldState => ({ error: true, loading: false }));
    }
  };

  return <Layout otherLabel='Preferinte'>
    <Typography variant={ 'h4' } className={ classes.title }>Preferinte</Typography>
    <Divider/>
    <MenuItem
      onClick={ handleNavigateToInitialSetup }
      title={ 'Reseteaza orarul' }
      description={ <>
        Foloseste aceasta optiune pentru a-ti seta (sau reseta) orarul.
        <br/>
        Toate materiile la care esti inscris si participarile la acestea vor disparea.
      </> }
      actionText={ 'Resteaza' }
    />

    <MenuItem
      onClick={ handleNavigateToAttendances }
      title={ 'Administrare materii' }
      description={ <>
        Adauga/sterge materii.
        <br/>
        Modifica formatiile cu care ai decis sa participi la ore.
      </> }
      actionText={ 'Materiile mele' }
    />

    <MenuItem
      onClick={ handleDownloadExport }
      title={ 'Export orar' }
      description={ <>
        Export orarul personal in format ics.
        <br/>
        (Format compatibil cu Google Calendar, MS Outlook, etc.)
      </> }
      actionText={ 'Exporta' }
      loading={ exportState.loading }
    />

  </Layout>;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
