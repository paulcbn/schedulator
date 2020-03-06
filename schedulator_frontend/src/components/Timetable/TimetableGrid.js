import React from 'react';
import { weekDayList } from '../../lib/config';
import TimetableColumn from './TimetableColumn';


const TimetableGrid = ({ smallScreen, referenceStart, referenceEnd, currentParity, groupedEntries, currentDisplayIndex, onClickEntry, displayFormation, displayTeacher }) => {
  if (smallScreen)
    return <TimetableColumn
      referenceStart={ referenceStart }
      referenceEnd={ referenceEnd }
      currentParity={ currentParity }
      rawEntries={ (groupedEntries[weekDayList[currentDisplayIndex].code] || []) }
      onClickEntry={ onClickEntry }
      displayFormation={ displayFormation }
      displayTeacher={ displayTeacher }/>;

  return weekDayList.map(({ code }) => <TimetableColumn
    key={ code }
    referenceStart={ referenceStart }
    referenceEnd={ referenceEnd }
    currentParity={ currentParity }
    rawEntries={ (groupedEntries[code] || []) }
    onClickEntry={ onClickEntry }
    displayFormation={ displayFormation }
    displayTeacher={ displayTeacher }/>);
};

export default TimetableGrid;
