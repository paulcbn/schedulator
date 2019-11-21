import { Fade, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
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

  const classes = useTimetableEntryStyle({
    top,
    bottom,
    left,
    right,
    color: positionedEntry.subjectComponent.name,
    overlapSize: positionedEntry.overlapSize,
  });
  return <Fade in>
    <Box className={ classes.entryBox }>
      <Paper className={ classes.entryPaper }>
        <ButtonBase component="div" className={ classes.buttonBase }>
          <Typography className={ classes.subject } align={ 'left' }>
            { positionedEntry.overlapSize === 1 || positionedEntry.subjectComponent.subject.alias==="" ? positionedEntry.subjectComponent.subject.name : positionedEntry.subjectComponent.subject.alias }
          </Typography>
          <Box className={ classes.subjectComponent }>
            <span className={ classes.subjectComponentColor }>
              { positionedEntry.subjectComponent.name }&nbsp;
            </span>
            <span>
              { positionedEntry.room.name }
            </span>
          </Box>
          <Typography className={ classes.formation } align={ 'left' }>
            { positionedEntry.formation.name }
          </Typography>
        </ButtonBase>
      </Paper>
    </Box>
  </Fade>;
};

const TimetableColumn = ({ referenceStart, referenceEnd, rawEntries, currentParity }) => {
  const classes = useTimetableColumnStyles();
  const positionedEntries = useMemo(() => {
    const parityFilteredEntries = rawEntries.filter(entry => entry.frequency === 'all' || currentParity === 'all' || currentParity === entry.frequency);
    return entryListToPositioningList(parityFilteredEntries);
  }, [ rawEntries, currentParity ]);

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
