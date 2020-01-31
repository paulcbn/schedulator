import { Fade, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React, { useMemo } from 'react';
import { deepGet } from '../../lib';
import { entryListToPositioningList } from '../../lib/time';
import { useTimetableColumnStyles, useTimetableEntryStyle } from './styles';


const TimetableEntry = ({ referenceStart, referenceEnd, positionedEntry, onClick, displayFormation, displayTeacher }) => {
  const { subjectAlias, startTime, endTime, overlapSize, overlapIndex, subjectName, subjectComponentType, roomName, formationName, teacherName } = useMemo(() => ({
    startTime: deepGet(positionedEntry, 'startTime', moment.duration(0)),
    endTime: deepGet(positionedEntry, 'endTime', moment.duration(0)),
    overlapSize: deepGet(positionedEntry, 'overlapSize', 1),
    overlapIndex: deepGet(positionedEntry, 'overlapIndex', 0),
    subjectName: deepGet(positionedEntry, 'subjectComponent.subject.name', ''),
    subjectAlias: deepGet(positionedEntry, 'subjectComponent.subject.alias', ''),
    formationName: deepGet(positionedEntry, 'formation.name', ''),
    subjectComponentType: deepGet(positionedEntry, 'subjectComponent.name', 'Unknown'),
    teacherName: deepGet(positionedEntry, 'teacher', 'Unknown'),
    roomName: deepGet(positionedEntry, 'room.name', 'Unknown'),
  }), [ positionedEntry ]);

  const durationHours = useMemo(() => Math.abs(moment.duration(moment.duration(endTime).subtract(startTime)).asHours()),
    [ startTime, endTime ]);
  const [ refStartSeconds, refEndSeconds, startSeconds, endSeconds ] = useMemo(() => [ referenceStart, referenceEnd, startTime, endTime ].map(d => d.asSeconds()),
    [ startTime, endTime, referenceStart, referenceEnd ]);

  const [ left, right ] = useMemo(() => {
    const width = 100 / overlapSize;
    return [ `${ overlapIndex * width }%`, `${ (overlapSize - overlapIndex - 1) * width }%` ];
  }, [ overlapSize, overlapIndex ]);

  const [ top, bottom ] = useMemo(() => {
    const fullSize = refEndSeconds - refStartSeconds;
    return [ `${ (startSeconds - refStartSeconds) * 100 / fullSize }%`, `${ (refEndSeconds - endSeconds) * 100 / fullSize }%` ];
  }, [ refStartSeconds, refEndSeconds, startSeconds, endSeconds ]);

  const subjectFontSize = useMemo(() => {
    const hasAlias = subjectAlias !== '';
    const overlapFactor = Math.max(Math.min(overlapSize, 6), 1);
    if (overlapSize === 1) return '0.9rem';
    if (hasAlias) return '0.8rem';
    return `${ 1 - overlapFactor * 0.1 }rem`;
  }, [ subjectAlias, overlapSize ]);


  const subjectComponentFontSize = useMemo(() => {
    const overlapFactor = Math.max(Math.min(overlapSize, 6), 1);
    if (overlapSize === 1) return '0.9rem';
    return `${ 1 - overlapFactor * 0.1 }rem`;
  }, [ overlapSize ]);


  const subjectBorderBottom = useMemo(() => durationHours < 2 ? '' : '1px solid', [ durationHours ]);
  const subjectHeight = useMemo(() => durationHours < 2 ? '100%' : '4rem', [ durationHours ]);
  const subjectComponentColor = useMemo(() => {
    switch (subjectComponentType) {
      case 'Curs':
        return '#00400b';
      case 'Seminar':
        return '#cd7200';
      default:
        return 'rgba(255,5,0,0.8)';
    }
  }, [ subjectComponentType ]);

  const classes = useTimetableEntryStyle({
    top,
    bottom,
    left,
    right,
    color: subjectComponentType,
    subjectFontSize,
    subjectComponentFontSize,
    subjectHeight,
    subjectBorderBottom,
    subjectComponentColor,
  });

  return <Fade in>
    <Box className={ classes.entryBox }>
      <Paper className={ classes.entryPaper }>
        <ButtonBase component="div" className={ classes.buttonBase } onClick={ () => onClick(positionedEntry) }>
          <Typography className={ classes.subject } align={ 'left' }>
            { overlapSize === 1 || subjectAlias === '' ? subjectName : subjectAlias }
          </Typography>
          { durationHours >= 2 &&
          <Box className={ classes.subjectComponent }>
            <span className={ classes.subjectComponentColor }>
              { subjectComponentType }&nbsp;
            </span>
            <span>
              { roomName }
            </span>
            { displayFormation === true && <span>
              ({ formationName })
            </span> }
            { displayTeacher === true && <span>
              ({ teacherName })
            </span> }
          </Box> }
        </ButtonBase>
      </Paper>
    </Box>
  </Fade>;
};

const TimetableColumn = ({ referenceStart, referenceEnd, rawEntries, currentParity, onClickEntry, displayFormation, displayTeacher }) => {
  const classes = useTimetableColumnStyles();
  const positionedEntries = useMemo(() => {
    const parityFilteredEntries = rawEntries.filter(entry => entry.frequency === 'all' || currentParity === 'all' || currentParity === entry.frequency);
    return entryListToPositioningList(parityFilteredEntries);
  }, [ rawEntries, currentParity ]);

  return <Box className={ classes.mainBox }>
    { positionedEntries.map(entry => <TimetableEntry
      key={ entry.id }
      referenceStart={ referenceStart }
      referenceEnd={ referenceEnd }
      positionedEntry={ entry }
      displayFormation={ displayFormation }
      onClick={ onClickEntry }
      displayTeacher={ displayTeacher }
    />) }
  </Box>;
};

export default TimetableColumn;
