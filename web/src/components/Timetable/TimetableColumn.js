import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { useMemo } from 'react';
import { entryListToPositioningList, timeStringToSeconds } from '../../lib/time';
import { useTimetableColumnStyles, useTimetableEntryStyle } from './styles';


const TimetableEntry = ({ referenceStart, referenceEnd, positionedEntry }) => {
  const [ refStartSeconds, refEndSeconds ] = useMemo(() => [
    timeStringToSeconds(referenceStart),
    timeStringToSeconds(referenceEnd),
  ], [ referenceStart, referenceEnd ]);

  const [ left, right ] = useMemo(() => {
      const width = 100 / positionedEntry.overlapSize;
      return [ `${ positionedEntry.overlapIndex * width }%`, `${ (positionedEntry.overlapSize - positionedEntry.overlapIndex - 1) * width }%` ];
    },
    [ positionedEntry.overlapSize, positionedEntry.overlapIndex ]);


  const [ top, bottom ] = useMemo(() => {
    const fullSize = refEndSeconds - refStartSeconds;
    return [ `${ (positionedEntry.startTime - refStartSeconds) * 100 / fullSize }%`, `${ (refEndSeconds - positionedEntry.endTime) * 100 / fullSize }%` ];
  }, [ refStartSeconds, refEndSeconds, positionedEntry.startTime, positionedEntry.endTime ]);


  const classes = useTimetableEntryStyle({ top, bottom, left, right });
  return <Box className={ classes.entryBox }>
    <Paper className={ classes.entryPaper }>
      <Typography>{ positionedEntry.subjectComponent.subject.name }</Typography>
      <Typography>{ positionedEntry.frequency }</Typography>
    </Paper>
  </Box>;
};

const TimetableColumn = ({ referenceStart, referenceEnd, rawEntries }) => {
  const classes = useTimetableColumnStyles();
  const positionedEntries = useMemo(() => entryListToPositioningList(rawEntries), [ rawEntries ]);

  return <>
    <Box className={ classes.mainBox }>
      { positionedEntries.map(entry => <TimetableEntry
        key={ entry.id }
        referenceStart={ referenceStart }
        referenceEnd={ referenceEnd }
        positionedEntry={ entry }
      />) }
    </Box>
  </>;
};

export default TimetableColumn;
