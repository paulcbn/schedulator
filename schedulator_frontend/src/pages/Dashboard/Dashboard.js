import { Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Switch from '@material-ui/core/Switch';
import DateIcon from '@material-ui/icons/DateRange';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import EntryInfoModal from '../../components/EntryInfoModal/EntryInfoModal';
import Layout from '../../components/Layout/Layout';
import { OverlayCircularProgress } from '../../components/OverlayCircularProgress';
import Timetable from '../../components/Timetable/Timetable';
import { deepGet } from '../../lib';
import { currentSemesterStatus } from '../../lib/actions';
import { useModal } from '../../lib/hooks';
import useStyles from './styles';

const Dashboard = ({ entries, semesterStatus, loading, loadCurrentSemesterStatus, customEntries }) => {
  const [ nextWeek, setNextWeek ] = useState(false);

  const handleNextWeekChange = event => setNextWeek(!!event.target.checked);
  useEffect(() => loadCurrentSemesterStatus(), [ loadCurrentSemesterStatus ]);

  const { week, nextWeekDelta } = useMemo(() => ({
    week: deepGet(semesterStatus, 'week', 1),
    nextWeekDelta: deepGet(semesterStatus, 'nextWeekDelta', 1),
    isVacation: deepGet(semesterStatus, 'isVacation', false),
  }), [ semesterStatus ]);

  const currentDate = useMemo(() => moment().startOf('day'), []);
  const displayDate = useMemo(() => nextWeek ? moment(currentDate).add(nextWeekDelta, 'week') : moment(currentDate), [ currentDate, nextWeek, nextWeekDelta ]);
  const currentParity = useMemo(() => (+week + (nextWeek ? 1 : 0)) % 2 === 0 ? 'evn' : 'odd', [ week, nextWeek ]);
  const { isOpen: isInfoModalOpen, open: openInfoModal, close: closeInfoModal, data: infoModalData } = useModal();

  const classes = useStyles();

  return <Layout>
    <Paper className={ classes.paper }>
      <OverlayCircularProgress show={ loading }/>
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
          label={ `Saptamana ${ +week + (nextWeek ? 1 : 0) }` }
          variant="outlined"
          color="secondary"
        />
      </Box>
      <Timetable
        referenceStart={ moment.duration('7:45:00') }
        referenceEnd={ moment.duration('20:15:00') }
        rawEntries={ entries }
        rawCustomEntries={ customEntries }
        currentDate={ displayDate }
        daysCount={ 5 }
        currentParity={ currentParity }
        referenceColumnStart={ moment.duration('8:00:00') }
        referenceColumnInterval={ moment.duration(60, 'minute') }
        onClickEntry={ openInfoModal }
      />
    </Paper>

    <EntryInfoModal isOpen={ isInfoModalOpen } onClose={ closeInfoModal } entry={ infoModalData }/>
  </Layout>;
};

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentSemesterStatus: () => dispatch(currentSemesterStatus.loadCurrentSemesterStatus()),
  };
};

const mapStateToProps = state => {
  return {
    entries: state.currentTimetable.ownTimetableEntries,
    customEntries: state.currentTimetable.personalTimetableEntries,
    semesterStatus: state.currentSemesterStatus.currentSemesterStatus,
    loading: state.currentTimetable.ownTimetableLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
