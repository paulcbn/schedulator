import { Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Switch from '@material-ui/core/Switch';
import DateIcon from '@material-ui/icons/DateRange';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import EntryInfoModal from '../../components/EntryInfoModal/EntryInfoModal';
import Layout from '../../components/Layout/Layout';
import { OverlayCircularProgress } from '../../components/OverlayCircularProgress';
import Timetable from '../../components/Timetable/Timetable';
import { currentSemesterStatus, useModal } from '../../lib';
import { deepGet } from '../../lib/utils';
import { staticTimetables } from '../../lib/actions';
import useStyles from './styles';

const StaticTimetable = ({ loadStaticTimetable, staticTimetable, loading, currentSemesterStatus, loadCurrentSemesterStatus }) => {
  const { searchId } = useParams();
  const classes = useStyles();
  const [ nextWeek, setNextWeek ] = useState(false);

  const { isOpen: isInfoModalOpen, open: openInfoModal, close: closeInfoModal, data: infoModalData } = useModal();

  useEffect(() => loadCurrentSemesterStatus(), [ loadCurrentSemesterStatus ]);

  const { week, nextWeekDelta } = useMemo(() => ({
    week: deepGet(currentSemesterStatus, 'week', 1),
    nextWeekDelta: deepGet(currentSemesterStatus, 'nextWeekDelta', 1),
    isVacation: deepGet(currentSemesterStatus, 'isVacation', false),
  }), [ currentSemesterStatus ]);

  const handleNextWeekChange = event => setNextWeek(!!event.target.checked);

  const currentDate = useMemo(() => moment().startOf('day'), []);
  const displayDate = useMemo(() => nextWeek ? moment(currentDate).add(nextWeekDelta, 'week') : moment(currentDate), [ currentDate, nextWeek, nextWeekDelta ]);
  const currentParity = useMemo(() => (+week + (nextWeek ? 1 : 0)) % 2 === 0 ? 'evn' : 'odd', [ week, nextWeek ]);

  useEffect(() => {
    if (searchId !== undefined)
      loadStaticTimetable(searchId);
  }, [ loadStaticTimetable, searchId ]);


  const { rawEntries, sectionName, sectionYear, formation, subjectName, subjectId, teacher } = useMemo(() => ({
    rawEntries: deepGet(staticTimetable, 'attendances', []),
    sectionName: deepGet(staticTimetable, 'section.name', null),
    sectionYear: deepGet(staticTimetable, 'section.year', ''),
    formation: deepGet(staticTimetable, 'mostRelevantFormation.name', null),
    subjectId: deepGet(staticTimetable, 'subject.sid', null),
    subjectName: deepGet(staticTimetable, 'subject.name', null),
    teacher: deepGet(staticTimetable, 'teacher', null),
  }), [ staticTimetable ]);

  const tabName = useMemo(() => formation || subjectId || teacher || 'Unknown', [ formation, subjectId, teacher ]);
  const displayFormation = useMemo(() => !!(teacher || subjectId), [ teacher, subjectId ]);
  const displayTeacher = useMemo(() => !!subjectId, [ subjectId ]);


  return <Layout otherLabel={ tabName }>
    <Paper className={ classes.paper }>
      <OverlayCircularProgress show={ loading }/>
      { sectionName !== null &&
      <Typography variant={ 'h5' } className={ classes.typography }>
        { sectionName }
        <Typography
          component={ 'span' }
          variant={ 'h5' }
          color={ 'textSecondary' }>
          &nbsp;({ sectionYear })
        </Typography>
        <Typography
          component={ 'span' }
          variant={ 'h5' }
          color={ 'textSecondary' }>
          &nbsp;-&nbsp;{ formation }
        </Typography>
      </Typography>
      }
      { teacher != null && <Typography variant={ 'h5' } className={ classes.typography }>{ teacher }</Typography> }
      { subjectId != null && <Typography variant={ 'h5' } className={ classes.typography }>
        { subjectName }
        <Typography
          component={ 'span' }
          variant={ 'h5' }
          color={ 'textSecondary' }>
          &nbsp;({ subjectId })
        </Typography>
      </Typography> }
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
        rawEntries={ rawEntries }
        currentDate={ displayDate }
        daysCount={ 5 }
        currentParity={ currentParity }
        referenceColumnStart={ moment.duration('8:00:00') }
        referenceColumnInterval={ moment.duration(60, 'minute') }
        onClickEntry={ openInfoModal }
        displayFormation={ displayFormation }
        displayTeacher={ displayTeacher }
      />
    </Paper>

    <EntryInfoModal isOpen={ isInfoModalOpen } onClose={ closeInfoModal } entry={ infoModalData }/>
  </Layout>;
};

const mapStateToProps = state => {
  return {
    staticTimetable: state.staticTimetables.staticTimetable,
    loading: state.staticTimetables.staticTimetableLoading,
    currentSemesterStatus: state.currentSemesterStatus.currentSemesterStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentSemesterStatus: () => dispatch(currentSemesterStatus.loadCurrentSemesterStatus()),
    loadStaticTimetable: (searchId) => {
      return dispatch(staticTimetables.loadStaticTimetable(searchId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaticTimetable);
