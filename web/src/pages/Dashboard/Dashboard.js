import { Button, Container, Paper, Typography } from '@material-ui/core';
import * as moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Timetable from '../../components/Timetable/Timetable';
import { auth } from '../../lib/actions';

const Dashboard = ({ user, logout, entries }) => {
  const history = useHistory();
  return <>
    <Container>
      <Paper>
        <Typography variant={ 'h4' }>
          Main dashboard
        </Typography>
        <Typography variant={ 'h5' }>
          { user.firstName }
          <br/>
          { user.lastName }
          <br/>
          { user.email }
        </Typography>

        <Timetable
          referenceStart={ moment.duration('7:30:00') }
          referenceEnd={ moment.duration('20:00:00') }
          rawEntries={ entries }
          currentWeekday={ 'Tu' }
        />

        <Button onClick={ logout } color="secondary" variant="contained">Logout</Button>
        <Button onClick={ () => {
          history.push('/initial-setup');
        } } color="secondary" variant="contained">Init setup</Button>
      </Paper>
    </Container>
  </>;
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    entries: state.currentStatus.ownTimetableEntries,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
