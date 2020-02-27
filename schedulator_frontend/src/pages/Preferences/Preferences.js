import { Paper } from '@material-ui/core';
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

  const handleNavigateToResetTimetable = () => history.push('/preferences/reset-timetable');
  const handleNavigateToAttendances = () => history.push('/preferences/attendances');
  const handleNavigateToCustomEntries = () => history.push('/custom-entries');

  const handleDownloadExport = async () => { // this is hacky, i know.
    setExportState(oldState => ({ ...oldState, loading: true }));
    try {
      const { data } = await API.get('/api/export-timetable/export-own-timetable');
      const url = window.URL.createObjectURL(new Blob([ data ]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `schedulator.ics`);
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
      onClick={ handleNavigateToResetTimetable }
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
      onClick={ handleNavigateToCustomEntries }
      title={ 'Administrare intrari auxiliare' }
      description={ <>
        Adauga/sterge intrari in orar care nu fac parte din orarul facultatii de mate-info.
        <br/>
        Poti creea sau sterge intrari care respecta sablonul intrarilor din orarul facultatii.
      </> }
      actionText={ 'Auxiliare' }
    />

    <MenuItem
      onClick={ handleDownloadExport }
      title={ 'Export orar' }
      description={ <>
        Export orarul personal in format ics.<br/>
        (Fara materiile personalizate, doar cele din orarul facultatii).<br/>
        (Format compatibil cu Google Calendar, MS Outlook, etc.)
      </> }
      actionText={ 'Exporta' }
      loading={ exportState.loading }
    />
    <Paper className={ classes.suggestionsPaper }>
      <Typography color={ 'textSecondary' }  component='div'>
        Pentru sugestii: <Typography className={ classes.email }>schedulator.suggestions@gmail.com</Typography>
      </Typography>
    </Paper>
  </Layout>;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
