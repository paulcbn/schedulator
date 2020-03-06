import moment from 'moment';
import { useMemo } from 'react';
import { deepGet, deepSet, groupBy } from '../../lib/utils';

const isOutOfBounds = (entry, start, end) => {
  if (entry === undefined || entry.startTime === undefined || entry.endTime === undefined)
    return false;

  const startTime = moment.duration(entry.startTime);
  const endTime = moment.duration(entry.endTime);

  return startTime.asSeconds() > end.asSeconds() || endTime.asSeconds() < start.asSeconds();
};

const truncateEntry = (entry, start, end) => {
  const startTime = moment.duration(entry.startTime, 'seconds');
  const endTime = moment.duration(entry.endTime, 'seconds');

  const startSeconds = Math.max(startTime.asSeconds(), start.asSeconds());
  const endSeconds = Math.min(endTime.asSeconds(), end.asSeconds());

  return {
    ...entry,
    startTime: moment.duration(startSeconds, 'seconds'),
    endTime: moment.duration(endSeconds, 'seconds'),
  };
};

const mapCustomEntryToRegularEntry = (customEntry) => {
  let resultEntry = { ...customEntry };
  resultEntry.id = `CustomId(${ customEntry.id })`;

  deepSet(resultEntry, 'id', `CustomEntry(${ deepGet(customEntry, 'id') })`);
  deepSet(resultEntry, 'subjectComponent.subject.name', deepGet(customEntry, 'subjectName'));
  deepSet(resultEntry, 'subjectComponent.name', deepGet(customEntry, 'subjectComponentName'));
  deepSet(resultEntry, 'room.name', deepGet(customEntry, 'roomName'));
  deepSet(resultEntry, 'formation.name', deepGet(customEntry, 'formationName'));

  return resultEntry;
};

export const useGroupedEntries = (rawEntries, rawCustomEntries, referenceStart, referenceEnd) => {
  const allRawEntries = useMemo(() => (rawEntries || []).concat((rawCustomEntries || []).map(mapCustomEntryToRegularEntry)),
    [ rawEntries, rawCustomEntries ]);
  const truncatedEntries = useMemo(() => allRawEntries
      .filter(entry => isOutOfBounds(entry, referenceStart, referenceEnd))
      .map(entry => truncateEntry(entry, referenceStart, referenceEnd)),
    [ allRawEntries, referenceStart, referenceEnd ]);
  return useMemo(() => groupBy(truncatedEntries, entry => entry.weekDay),
    [ truncatedEntries ]);
};
