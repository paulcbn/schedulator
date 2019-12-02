import { CircularProgress, Paper, Typography } from '@material-ui/core';
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
import Timetable from '../../components/Timetable/Timetable';
import { deepGet, useModal } from '../../lib';
import { staticTables } from '../../lib/actions';
import useStyles from './styles';

const StaticTable = ({ loadStaticTable, staticTable, loading, currentWeek }) => {
  const { searchId } = useParams();
  const classes = useStyles();
  const [ nextWeek, setNextWeek ] = useState(false);
  const { isOpen: isInfoModalOpen, open: openInfoModal, close: closeInfoModal, data: infoModalData } = useModal();
  const currentDate = useMemo(() => moment().startOf('day'), []);
  const handleNextWeekChange = event => setNextWeek(!!event.target.checked);
  const displayDate = useMemo(() => nextWeek ? moment(currentDate).add(1, 'week') : moment(currentDate), [ currentDate, nextWeek ]);
  const currentParity = useMemo(() => (+currentWeek + (nextWeek ? 1 : 0)) % 2 === 0 ? 'evn' : 'odd', [ currentWeek, nextWeek ]);
  useEffect(() => {
    if (searchId !== undefined)
      loadStaticTable(searchId);
  }, [ loadStaticTable, searchId ]);


  const { rawEntries, sectionName, sectionYear, formation } = useMemo(() => ({
    rawEntries: deepGet(staticTable, 'attendances', []),
    sectionName: deepGet(staticTable, 'section.name', ''),
    sectionYear: deepGet(staticTable, 'section.year', ''),
    formation: deepGet(staticTable, 'mostRelevantFormation.name', ''),
  }), [ staticTable ]);

  if (loading === true)
    return <Layout>
      <CircularProgress/>
    </Layout>;


  return <Layout otherLabel={ formation }>
    <Paper className={ classes.paper }>
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
        rawEntries={ rawEntries }
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

const mapStateToProps = state => {
  return {
    staticTable: state.staticTables.staticTable,
    loading: state.staticTables.staticTableLoading,
    currentWeek: state.currentStatus.currentWeek,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadStaticTable: (searchId) => {
      return dispatch(staticTables.loadStaticTable(searchId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaticTable);
