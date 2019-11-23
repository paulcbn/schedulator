import { Fade, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React, { useMemo } from 'react';
import { deepGet } from '../../lib';
import { entryListToPositioningList } from '../../lib/time';
import { useTimetableColumnStyles, useTimetableEntryStyle } from './styles';


const TimetableEntry = ({ referenceStart, referenceEnd, positionedEntry }) => {
  const { subjectAlias, startTime, endTime, overlapSize, overlapIndex, subjectName, subjectComponentType, roomName, formationName } = useMemo(() => ({
    startTime: deepGet(positionedEntry, 'startTime', moment.duration(0)),
    endTime: deepGet(positionedEntry, 'endTime', moment.duration(0)),
    overlapSize: deepGet(positionedEntry, 'overlapSize', 1),
    overlapIndex: deepGet(positionedEntry, 'overlapIndex', 0),
    subjectName: deepGet(positionedEntry, 'subjectComponent.subject.name', ''),
    subjectAlias: deepGet(positionedEntry, 'subjectComponent.subject.alias', ''),
    subjectComponentType: deepGet(positionedEntry, 'subjectComponent.name', 'Unknown'),
    formationName: deepGet(positionedEntry, 'formation.name', 'Unknown'),
    roomName: deepGet(positionedEntry, 'room.name', 'Unknown'),
  }), [ positionedEntry ]);

  const [ refStartSeconds, refEndSeconds, startSeconds, endSeconds ] = useMemo(() => [ referenceStart, referenceEnd, startTime, endTime ].map(d => d.asSeconds()),
    [ startTime, endTime, referenceStart, referenceEnd ]);

  const [ left, right ] = useMemo(() => {
      const width = 100 / overlapSize;
      return [ `${ overlapIndex * width }%`, `${ (overlapSize - overlapIndex - 1) * width }%` ];
    },
    [ overlapSize, overlapIndex ]);


  const [ top, bottom ] = useMemo(() => {
    const fullSize = refEndSeconds - refStartSeconds;
    return [ `${ (startSeconds - refStartSeconds) * 100 / fullSize }%`, `${ (refEndSeconds - endSeconds) * 100 / fullSize }%` ];
  }, [ refStartSeconds, refEndSeconds, startSeconds, endSeconds ]);

  const classes = useTimetableEntryStyle({
    top,
    bottom,
    left,
    right,
    color: subjectComponentType,
    overlapSize: overlapSize,
  });

  return <Fade in>
    <Box className={ classes.entryBox }>
      <Paper className={ classes.entryPaper }>
        <ButtonBase component="div" className={ classes.buttonBase }>
          <Typography className={ classes.subject } align={ 'left' }>
            { overlapSize === 1 || subjectAlias === '' ? subjectName : subjectAlias }
          </Typography>
          <Box className={ classes.subjectComponent }>
            <span className={ classes.subjectComponentColor }>
              { subjectComponentType }&nbsp;
            </span>
            <span>
              { roomName }
            </span>
          </Box>
          <Typography className={ classes.formation } align={ 'left' }>
            { formationName }
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
