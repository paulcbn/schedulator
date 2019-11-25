import { Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import Timetable from '../../components/Timetable/Timetable';
import { auth } from '../../lib/actions';
import DateIcon from '@material-ui/icons/DateRange';
import useStyles from './styles';

const Dashboard = ({ entries, currentWeek }) => {
  const [ nextWeek, setNextWeek ] = useState(false);

  const handleNextWeekChange = event => setNextWeek(!!event.target.checked);

  const currentDate = useMemo(moment, []);
  const displayDate = useMemo(() => nextWeek ? moment(currentDate).add(1, 'week') : currentDate, [ currentDate, nextWeek ]);
  const currentParity = useMemo(() => (+currentWeek + (nextWeek ? 1 : 0)) % 2 === 0 ? 'evn' : 'odd', [ currentWeek, nextWeek ]);


  const classes = useStyles();
  return <Layout>
    <Paper className={ classes.paper }>

      <Box className={ classes.topBox }>
        <Box className={ classes.switchBox }>
          <Switch
            checked={ nextWeek }
            onChange={ handleNextWeekChange }
            value="nextWeek"
            size="small"
          />
          <Typography variant='body2' color={ !!nextWeek ? 'secondary' : 'textSecondary' }>
            Sapt. urmatoare
          </Typography>
        </Box>
        <Chip
          icon={ <DateIcon/> }
          label={ `Saptamana ${ +currentWeek + (nextWeek ? 1 : 0) }` }
          variant="outlined"
          color="secondary"
        />
      </Box>
      <Timetable
        referenceStart={ moment.duration('7:45:00') }
        referenceEnd={ moment.duration('20:15:00') }
        rawEntries={ entries }
        currentDate={ displayDate }
        daysCount={ 5 }
        currentParity={ currentParity }
        referenceColumnStart={ moment.duration('8:00:00') }
        referenceColumnInterval={ moment.duration(60, 'minute') }
      />
    </Paper>
  </Layout>;
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
    currentWeek: state.currentStatus.currentWeek,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
