import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useMemo } from 'react';
import { weekDayList } from '../../lib/config';
import { deepGet } from '../../lib/utils';
import { useTimetableHeaderItemStyle, useTimetableHeaderStyle } from './styles';

const TimetableHeaderItem = ({ day, mondayDate }) => {

  const { name, index } = useMemo(() => ({
    name: deepGet(day, 'name', 'Luni?'),
    index: deepGet(day, 'index', 0),
  }), [ day ]);
  const classes = useTimetableHeaderItemStyle();
  return <Box className={ classes.header }>
    <Typography variant='h5' className={ classes.weekDay }>
      { name }
    </Typography>
    <Typography variant='body1' className={ classes.weekDay }>
      { moment(mondayDate).add(index, 'days').format('Do MMMM') }
    </Typography>
  </Box>;
};

const TimetableHeader = ({ mondayDate, currentDisplayIndex, smallScreen }) => {
  const displayOnlyCurrentIndex = useMemo(() => !!smallScreen, [ smallScreen ]);
  const classes = useTimetableHeaderStyle();

  if (displayOnlyCurrentIndex)
    return <TimetableHeaderItem day={ weekDayList[currentDisplayIndex] } mondayDate={ mondayDate }/>;

  return <>
    <Box className={ classes.referenceColumnSpacer }/>
    { weekDayList.map(day => <TimetableHeaderItem key={ day.index } day={ day } mondayDate={ mondayDate }/>) }
  </>;
};

export default TimetableHeader;
