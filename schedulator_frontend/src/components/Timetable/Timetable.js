import { Box, Button, Hidden, Typography } from '@material-ui/core';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';
import moment from 'moment';
import React, { useMemo, useRef, useState } from 'react';
import ReactResizeDetector from 'react-resize-detector';

import { weekDayCodes } from '../../lib/config';
import { deepGet, deepSet, groupBy } from '../../lib/utils';

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
  const dif = Math.round(+moment.duration(date.diff(moment(date).startOf('isoWeek'))).asDays());
  if (dif < 0)
    return 0;
  if (dif >= daysCount)
    return daysCount - 1;
  return dif;
};

const mapCustomEntryToRegularEntry = (customEntry) => {
  let resultEntry = { ...customEntry };
  resultEntry.id = `CustomId(${ customEntry.id })`;

  deepSet(resultEntry, 'id', `CustomEntry(${ deepGet(customEntry, 'id') })`);
  deepSet(resultEntry, 'subjectComponent.subject.name', deepGet(customEntry, 'subjectName'));
  deepSet(resultEntry, 'subjectComponent.name', deepGet(customEntry, 'subjectComponentName'));
  deepSet(resultEntry, 'room.name', deepGet(customEntry, 'roomName'));
  deepSet(resultEntry, 'formation.name', deepGet(customEntry, 'formationName'));

  return resultEntry;
};

const Timetable = (
  {
    referenceStart,
    referenceEnd,
    rawEntries,
    rawCustomEntries,
    currentDate,
    currentParity,
    daysCount,
    referenceColumnStart,
    referenceColumnInterval,
    onClickEntry,
    displayFormation,
    displayTeacher,
  }) => {
  const [ weekdayOffset, setWeekdayOffset ] = useState(0);
  const [ scrollbarWidth, setScrollbarWidth ] = useState(0);

  const mondayDate = useMemo(() => moment(currentDate).startOf('isoWeek'), [ currentDate ]);
  const currentWeekdayIndex = useMemo(() => getWeekdayIndex(currentDate, daysCount), [ currentDate, daysCount ]);

  const allRawEntries = useMemo(() => (rawEntries || []).concat((rawCustomEntries || []).map(mapCustomEntryToRegularEntry)),
    [ rawEntries, rawCustomEntries ]);
  const truncatedEntries = useMemo(() => allRawEntries
      .filter(entry => isOutOfBounds(entry, referenceStart, referenceEnd))
      .map(entry => truncateEntry(entry, referenceStart, referenceEnd)),
    [ allRawEntries, referenceStart, referenceEnd ]);
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

  const gridScrollBoxRef = useRef(null);

  const handleHeightResize = () => {
    const element = deepGet(gridScrollBoxRef, 'current', null);
    if (element === null) setScrollbarWidth('0');
    else {
      const width = element.offsetWidth - element.scrollWidth;
      setScrollbarWidth(`${ width }px`);
    }
  };
  const classes = useTimetableStyle({ scrollbarWidth });
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
          rawEntries={ (groupedEntries[code] || []) }
          onClickEntry={ onClickEntry }
          displayFormation={ displayFormation }
          displayTeacher={ displayTeacher }/>
      </Hidden>;
    },
  );
  const renderHeader = () => days.map(({ code, name }, index) => {
      if (index >= daysCount)
        return null;
      return (
        <Hidden smDown={ code !== deepGet(days[currentWeekdayIndex + weekdayOffset], 'code', undefined) } key={ code }>
          <Box className={ classes.header }>
            <Typography variant='h5' className={ classes.weekDay }>
              { name }
            </Typography>
            <Typography variant='body1' className={ classes.weekDay }>
              { moment(mondayDate).add(index, 'days').format('Do MMMM') }
            </Typography>
          </Box>
        </Hidden>);
    },
  );

  return <Box className={ classes.mainBox }>
    <Box className={ classes.headerBox }>
      <Box className={ classes.referenceColumnSpacer }/>
      { renderHeader() }
      <Box className={ classes.scrollOffsetSpacer }/>
    </Box>
    <Box className={ classes.gridBox } ref={ gridScrollBoxRef }>
      <ReactResizeDetector refreshMode='debounce' refreshRate={ 100 } handleHeight onResize={ handleHeightResize }/>
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
          onClick={ () => setWeekdayOffset(old => currentWeekdayIndex + old > 0 ? old - 1 : old) }
          disabled={ currentWeekdayIndex + weekdayOffset === 0 }>
          Ziua prec.
        </Button>
        <Box className={ classes.flexExpander }/>
        <Button
          className={ classes.navButton }
          variant="outlined"
          startIcon={ <NextIcon/> }
          color="secondary"
          onClick={ () => setWeekdayOffset(old => currentWeekdayIndex + old < daysCount - 1 ? old + 1 : old) }
          disabled={ currentWeekdayIndex + weekdayOffset === daysCount - 1 }>
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

const days = Object.entries(weekDayCodes)
  .sort(([ code1, { index1 } ], [ code2, { index2 } ]) => index1 - index2)
  .map(([ code, { name } ]) => ({ code, name }));


// The result is something like this:

// const days = [
//   {
//     code: 'Mo',
//     name: 'Luni',
//   },
//   ...
// ];
