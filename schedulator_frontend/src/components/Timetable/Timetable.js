import { Box, useMediaQuery } from '@material-ui/core';
import moment from 'moment';
import React, { useMemo, useRef, useState } from 'react';
import ReactResizeDetector from 'react-resize-detector';

import { weekDayList } from '../../lib/config';
import { deepGet } from '../../lib/utils';
import { useGroupedEntries } from './entryProcessingUtils';
import SmallScreenNavigation from './SmallScreenNavigation';
import { useTimetableStyle } from './styles';
import TimeReferenceColumn from './TimeReferenceColumn';
import { useTimeReferenceEntries } from './timeReferenceEntriesUtils';
import TimetableGrid from './TimetableGrid';
import TimetableHeader from './TimetableHeader';

const getWeekdayIndex = (date) => {
  const dif = Math.round(+moment.duration(date.diff(moment(date).startOf('isoWeek'))).asDays());
  if (dif < 0)
    return 0;
  if (dif >= weekDayList.length)
    return weekDayList.length - 1;
  return dif;
};

const Timetable = (
  {
    referenceStart,
    referenceEnd,
    rawEntries,
    rawCustomEntries,
    currentDate,
    currentParity,
    referenceColumnStart,
    referenceColumnInterval,
    onClickEntry,
    displayFormation,
    displayTeacher,
  }) => {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const [ weekdayOffset, setWeekdayOffset ] = useState(0);
  const [ scrollbarWidth, setScrollbarWidth ] = useState(0);

  const classes = useTimetableStyle({ scrollbarWidth });

  const mondayDate = useMemo(() => moment(currentDate).startOf('isoWeek'), [ currentDate ]);

  const currentWeekdayIndex = useMemo(() => getWeekdayIndex(currentDate), [ currentDate ]);
  const currentDisplayIndex = useMemo(() => currentWeekdayIndex + weekdayOffset, [ weekdayOffset, currentWeekdayIndex ]);

  const groupedEntries = useGroupedEntries(rawEntries, rawCustomEntries, referenceStart, referenceEnd);
  const timeReferenceEntries = useTimeReferenceEntries(referenceColumnStart, referenceColumnInterval, referenceStart, referenceEnd);


  const gridScrollBoxRef = useRef(null);
  const handleHeightResize = () => {
    const element = deepGet(gridScrollBoxRef, 'current', null);
    if (element === null) setScrollbarWidth('0');
    else {
      const width = element.offsetWidth - element.scrollWidth;
      setScrollbarWidth(`${ width }px`);
    }
  };

  return <Box className={ classes.mainBox }>
    <Box className={ classes.headerBox }>
      <TimetableHeader
        mondayDate={ mondayDate }
        currentDisplayIndex={ currentDisplayIndex }
        smallScreen={ isSmallScreen }
      />
      <Box className={ classes.scrollOffsetSpacer }/>
    </Box>
    <Box className={ classes.gridBox } ref={ gridScrollBoxRef }>
      <ReactResizeDetector refreshMode='debounce' refreshRate={ 100 } handleHeight onResize={ handleHeightResize }/>
      <Box className={ classes.gridScrollBox }>
        <TimeReferenceColumn
          timeReferenceEntries={ timeReferenceEntries }
          referenceStart={ referenceStart }
          referenceEnd={ referenceEnd }
        />
        <TimetableGrid
          groupedEntries={ groupedEntries }
          referenceStart={ referenceStart }
          referenceEnd={ referenceEnd }
          currentDisplayIndex={ currentDisplayIndex }
          currentParity={ currentParity }
          smallScreen={ isSmallScreen }
          displayTeacher={ displayTeacher }
          displayFormation={ displayFormation }
          onClickEntry={ onClickEntry }
        />
      </Box>
    </Box>
    <SmallScreenNavigation
      smallScreen={ isSmallScreen }
      onPrev={ () => setWeekdayOffset(old => currentWeekdayIndex + old > 0 ? old - 1 : old) }
      prevDisabled={ currentWeekdayIndex + weekdayOffset === 0 }
      onNext={ () => setWeekdayOffset(old => currentWeekdayIndex + old < weekDayList.length - 1 ? old + 1 : old) }
      nextDisabled={ currentWeekdayIndex + weekdayOffset === weekDayList.length - 1 }
    />
  </Box>;
};

export default Timetable;
