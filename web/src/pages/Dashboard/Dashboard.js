import { Button, Container, Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Timetable from '../../components/Timetable/Timetable';
import { auth } from '../../lib/actions';

const Dashboard = ({ user, logout, entries }) => {
  const history = useHistory();
  const [ nextWeek, setNextWeek ] = useState(false);

  const handleNextWeekChange = event => setNextWeek(!!event.target.checked);

  const currentDate = useMemo(moment, []);
  const displayDate = useMemo(() => nextWeek ? moment(currentDate).add(1, 'week') : currentDate, [ currentDate, nextWeek ]);
  const semesterStart = useMemo(() => moment('2019-09-30'), []);
  const currentWeek = useMemo(() => displayDate.startOf('isoWeek').diff(semesterStart.startOf('isoWeek'), 'week') + 1, [ semesterStart, displayDate ]);
  const currentParity = useMemo(() => +currentWeek % 2 === 0 ? 'evn' : 'odd', [ currentWeek ]);



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
        <Box style={ { display: 'flex' } }>
          <Switch
            checked={ nextWeek }
            onChange={ handleNextWeekChange }
            value="nextWeek"
          />
          <Typography variant={ 'h6' }>
            Saptamana urmatoare
          </Typography>
        </Box>
        <Timetable
          referenceStart={ moment.duration('7:30:00') }
          referenceEnd={ moment.duration('20:30:00') }
          rawEntries={ entries }
          currentWeekdayIndex={ 3 }
          daysCount={ 5 }
          currentParity={ currentParity }
          mondayDate={ displayDate.startOf('isoWeek') }
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
