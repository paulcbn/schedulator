import { deepGet, weekDayCodes } from '../../lib';

export const compareTimetableEntriesByDay = (entry1, entry2) => {
  const sectionId1 = deepGet(entry1, 'formation.section.id', 0);
  const sectionId2 = deepGet(entry2, 'formation.section.id', 0);

  if (sectionId1 !== sectionId2)
    return sectionId1 - sectionId2;


  const weekDayCode1 = deepGet(entry1, 'weekDay');
  if (weekDayCode1 === undefined)
    return 1;

  const weekDayCode2 = deepGet(entry2, 'weekDay');
  if (weekDayCode2 === undefined)
    return -1;

  if (weekDayCode1 !== weekDayCode2)
    return weekDayCodes[weekDayCode1].index - weekDayCodes[weekDayCode2].index;

  const startTime1 = deepGet(entry1, 'startTime', '23:59:59');
  const startTime2 = deepGet(entry2, 'startTime', '23:59:59');

  return startTime1.localeCompare(startTime2);
};
