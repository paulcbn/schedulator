import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useMemo } from 'react';
import { useReferenceEntryStyle, useTimeReferenceColumnClasses } from './styles';

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

const TimeReferenceColumn = ({ referenceStart, referenceEnd, timeReferenceEntries }) => {
  const classes = useTimeReferenceColumnClasses();
  return <>
    <Box className={ classes.referenceColumnSpacer }/>
    { timeReferenceEntries.map(entry =>
      <TimeReferenceEntry
        key={ entry }
        referenceStart={ referenceStart }
        referenceEnd={ referenceEnd }
        currentTime={ entry }
      />,
    ) }
  </>;
};

export default TimeReferenceColumn;
