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
import { currentWeek, deepGet, useModal } from '../../lib';
import { staticTables } from '../../lib/actions';
import useStyles from './styles';

const StaticTable = ({ loadStaticTable, staticTable, loading, currentWeekStatus, loadCurrentWeek }) => {
  const { searchId } = useParams();
  const classes = useStyles();
  const [ nextWeek, setNextWeek ] = useState(false);

  const { isOpen: isInfoModalOpen, open: openInfoModal, close: closeInfoModal, data: infoModalData } = useModal();

  useEffect(() => loadCurrentWeek(), [ loadCurrentWeek ]);

  const { week, nextWeekDelta } = useMemo(() => ({
    week: deepGet(currentWeekStatus, 'week', 1),
    nextWeekDelta: deepGet(currentWeekStatus, 'nextWeekDelta', 1),
    isVacation: deepGet(currentWeekStatus, 'isVacation', false),
  }), [ currentWeekStatus ]);

  const handleNextWeekChange = event => setNextWeek(!!event.target.checked);

  const currentDate = useMemo(() => moment().startOf('day'), []);
  const displayDate = useMemo(() => nextWeek ? moment(currentDate).add(nextWeekDelta, 'week') : moment(currentDate), [ currentDate, nextWeek, nextWeekDelta ]);
  const currentParity = useMemo(() => (+week + (nextWeek ? 1 : 0)) % 2 === 0 ? 'evn' : 'odd', [ week, nextWeek ]);

  useEffect(() => {
    if (searchId !== undefined)
      loadStaticTable(searchId);
  }, [ loadStaticTable, searchId ]);


  const { rawEntries, sectionName, sectionYear, formation, subjectName, subjectId, teacher } = useMemo(() => ({
    rawEntries: deepGet(staticTable, 'attendances', []),
    sectionName: deepGet(staticTable, 'section.name', null),
    sectionYear: deepGet(staticTable, 'section.year', ''),
    formation: deepGet(staticTable, 'mostRelevantFormation.name', null),
    subjectId: deepGet(staticTable, 'subject.sid', null),
    subjectName: deepGet(staticTable, 'subject.name', null),
    teacher: deepGet(staticTable, 'teacher', null),
  }), [ staticTable ]);

  const tabName = useMemo(() => formation || subjectId || teacher || 'Unknown', [ formation, subjectId, teacher ]);
  const displayFormation = useMemo(() => !!(teacher || subjectId), [ teacher, subjectId ]);
  const displayTeacher = useMemo(() => !!subjectId, [ subjectId ]);


  return <Layout otherLabel={ tabName }>
    <Paper className={ classes.paper }>
      <OverlayCircularProgress show={loading}/>
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
    staticTable: state.staticTables.staticTable,
    loading: state.staticTables.staticTableLoading,
    currentWeekStatus: state.currentWeek.currentWeekStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentWeek: () => dispatch(currentWeek.loadCurrentWeek()),
    loadStaticTable: (searchId) => {
      return dispatch(staticTables.loadStaticTable(searchId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaticTable);
