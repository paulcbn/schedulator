import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { deepGet } from '../../lib';
import { groupBy } from '../../lib/time';
import { useReferenceEntryStyle, useTimetableStyle } from './styles';
import TimetableColumn from './TimetableColumn';

const isOutOfBounds = (entry, start, end) => {
  if (entry === undefined || entry.startTime === undefined || entry.endTime === undefined)
    return false;

  const startTime = moment.duration(entry.startTime);
  const endTime = moment.duration(entry.endTime);

  return startTime.asSeconds() > end.asSeconds() || endTime.asSeconds() < start.asSeconds();
};

const truncateEntry = (entry, start, end) => {
  const startTime = moment.duration(entry.startTime, 'seconds');
  const endTime = moment.duration(entry.endTime, 'seconds');

  const startSeconds = Math.max(startTime.asSeconds(), start.asSeconds());
  const endSeconds = Math.min(endTime.asSeconds(), end.asSeconds());

  return {
    ...entry,
    startTime: moment.duration(startSeconds, 'seconds'),
    endTime: moment.duration(endSeconds, 'seconds'),
  };
};

const getWeekdayIndex = (date, daysCount) => {
  const dif = +moment.duration(date.diff(date.startOf('isoWeek'))).asDays();
  if (dif < 0)
    return 0;
  if (dif >= daysCount)
    return daysCount - 1;
  return dif;
};

const Timetable = (
  {
    referenceStart,
    referenceEnd,
    rawEntries,
    currentDate,
    currentParity,
    daysCount,
    referenceColumnStart,
    referenceColumnInterval,
  }) => {
  const classes = useTimetableStyle();
  const mondayDate = useMemo(() => currentDate.startOf('isoWeek'), [ currentDate ]);
  const currentWeekdayIndex = useMemo(() => getWeekdayIndex(currentDate, daysCount), [ currentDate, daysCount ]);
  const [ weekdayOffset, setWeekdayOffset ] = useState(0);

  const truncatedEntries = useMemo(() => rawEntries
      .filter(entry => isOutOfBounds(entry, referenceStart, referenceEnd))
      .map(entry => truncateEntry(entry, referenceStart, referenceEnd)),
    [ rawEntries, referenceStart, referenceEnd ]);

  const groupedEntries = useMemo(() => groupBy(truncatedEntries, entry => entry.weekDay),
    [ truncatedEntries ]);

  const referenceTimes = useMemo(() => {
    let result = [];
    const startTime = referenceColumnStart.asSeconds() >= referenceStart.asSeconds() ? referenceColumnStart : referenceStart;
    let currentGeneratedTime = moment.duration(startTime);
    while (currentGeneratedTime.asSeconds() < referenceEnd.asSeconds()) {
      result.push(moment.duration(currentGeneratedTime));
      currentGeneratedTime.add(referenceColumnInterval);
    }

    return result;
  }, [ referenceColumnStart, referenceColumnInterval, referenceStart, referenceEnd ]);


  const renderReferenceTimes = () => referenceTimes.map(entry =>
    <TimeReferenceEntry
      key={ entry }
      referenceStart={ referenceStart }
      referenceEnd={ referenceEnd }
      currentTime={ entry }/>,
  );

  const renderGrid = () => days.map(({ code }, index) => {
      if (index >= daysCount)
        return null;
      return <Hidden key={ code }
                     smDown={ code !== deepGet(days[currentWeekdayIndex + weekdayOffset], 'code', undefined) }>
        <TimetableColumn
          referenceStart={ referenceStart }
          referenceEnd={ referenceEnd }
          currentParity={ currentParity }
          rawEntries={ (groupedEntries[code] || []) }/>
      </Hidden>;
    },
  );
  const renderHeader = () => days.map(({ code, name }, index) => {
      if (index >= daysCount)
        return null;
      return <Hidden smDown={ code !== deepGet(days[currentWeekdayIndex + weekdayOffset], 'code', undefined) }
                     key={ code }>
        <Box className={ classes.header }>
          <Typography variant='h5' className={ classes.weekDay }>
            { name }
          </Typography>
          <Typography variant='body1' className={ classes.weekDay }>
            { moment(mondayDate).add(index, 'days').format('Do MMMM') }
          </Typography>
        </Box>
      </Hidden>;
    },
  );

  return <Box className={ classes.mainBox }>
    <Box className={ classes.headerBox }>
      <Box className={ classes.referenceColumnSpacer }/>
      { renderHeader() }
    </Box>
    <Box className={ classes.gridBox }>
      <Box className={ classes.gridScrollBox }>
        <Box className={ classes.referenceColumnSpacer }/>
        { renderReferenceTimes() }
        { renderGrid() }
      </Box>
    </Box>
    <Hidden mdUp>
      <Box className={ classes.navigationBox }>
        <Button
          className={ classes.navButton }
          variant="outlined"
          startIcon={ <PrevIcon/> }
          color="secondary"
          onClick={ () => setWeekdayOffset(old => +old > 0 ? old - 1 : old) }
          disabled={ +weekdayOffset === 0 }>
          Ziua prec.
        </Button>
        <Box className={ classes.flexExpander }/>
        <Button
          className={ classes.navButton }
          variant="outlined"
          startIcon={ <NextIcon/> }
          color="secondary"
          onClick={ () => setWeekdayOffset(old => +old < daysCount - 1 ? old + 1 : old) }
          disabled={ +weekdayOffset === daysCount - 1 }>
          Ziua urm.
        </Button>
      </Box>
    </Hidden>

  </Box>;
};

const TimeReferenceEntry = ({ referenceStart, referenceEnd, currentTime }) => {

  const startSeconds = useMemo(() => referenceStart.asSeconds(), [ referenceStart ]);
  const endSeconds = useMemo(() => referenceEnd.asSeconds(), [ referenceEnd ]);
  const currentSeconds = useMemo(() => currentTime.asSeconds(), [ currentTime ]);

  const readableTime = useMemo(() => {
    return moment.utc(moment.duration(currentTime).asMilliseconds()).format('HH:mm');
  }, [ currentTime ]);

  const bottom = useMemo(() => {
    const fullSize = endSeconds - startSeconds;
    return `${ (endSeconds - currentSeconds) * 100 / fullSize }%`;
  }, [ startSeconds, endSeconds, currentSeconds ]);


  const classes = useReferenceEntryStyle({ bottom });
  return <>
    <Box className={ classes.entryBox }>
      <Typography className={ classes.time }>
        { readableTime }
      </Typography>
    </Box>
  </>;
};

export default Timetable;


const days = [
  {
    code: 'Mo',
    name: 'Luni',
  },
  {
    code: 'Tu',
    name: 'Marti',
  },
  {
    code: 'We',
    name: 'Miercuri',
  },
  {
    code: 'Th',
    name: 'Joi',
  },
  {
    code: 'Fr',
    name: 'Vineri',
  },
  {
    code: 'Sa',
    name: 'Sambata',
  },
  {
    code: 'Su',
    name: 'Duminica',
  },
];
