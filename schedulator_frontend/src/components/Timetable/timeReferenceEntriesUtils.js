import moment from 'moment';
import { useMemo } from 'react';

export const useTimeReferenceEntries = (referenceColumnStart, referenceColumnInterval, referenceStart, referenceEnd) => useMemo(() => {
  let result = [];
  const startTime = referenceColumnStart.asSeconds() >= referenceStart.asSeconds() ? referenceColumnStart : referenceStart;
  let currentGeneratedTime = moment.duration(startTime);
  while (currentGeneratedTime.asSeconds() < referenceEnd.asSeconds()) {
    result.push(moment.duration(currentGeneratedTime));
    currentGeneratedTime.add(referenceColumnInterval);
  }
  return result;
}, [ referenceColumnStart, referenceColumnInterval, referenceStart, referenceEnd ]);
