import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import moment from 'moment';
import React, { useMemo } from 'react';
import { groupBy } from '../../lib/time';
import { useReferenceEntryStyle, useTimetableStyle } from './styles';
import TimetableColumn from './TimetableColumn';


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
];
const referenceTimes = [ '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00',
  '17:00:00', '18:00:00', '19:00:00', '20:00:00' ].map(moment.duration);

const Timetable = ({ referenceStart, referenceEnd, rawEntries, currentWeekdayIndex, currentParity, mondayDate, daysCount }) => {
  const classes = useTimetableStyle();

  const groupedEntries = useMemo(() => groupBy(rawEntries, entry => entry.weekDay),
    [ rawEntries ]);

  const renderReferenceTimes = () => referenceTimes.map(entry =>
    <TimeReferenceEntry
      key={ entry }
      referenceStart={ referenceStart }
      referenceEnd={ referenceEnd }
      currentTime={ entry }/>,
  );

  const renderGrid = () => days.map(({ code }, index) => {
      if (index >= daysCount)
        return <></>;
      return <Hidden key={ code } smDown={ code !== days[currentWeekdayIndex].code }>
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
        return <></>;
      return <Hidden smDown={ code !== days[currentWeekdayIndex].code } key={ code }>
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
      <Box className={ classes.referenceColumnSpacer }/>
      { renderReferenceTimes() }
      { renderGrid() }
    </Box>
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
