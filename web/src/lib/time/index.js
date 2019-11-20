import moment from 'moment';

export const timeStringToSeconds = timeString => moment.duration(timeString).asSeconds();

const entriesOverlap = (entry1, entry2) => (entry1.startTime >= entry2.startTime && entry1.startTime < entry2.endTime)
  || (entry1.endTime > entry2.startTime && entry1.endTime <= entry2.endTime)
  || (entry1.startTime <= entry2.startTime && entry1.endTime >= entry2.endTime);

const merge = (destSet, sourceSet) => {
  sourceSet.forEach(element => destSet.add(element));
};

const compareEntries = (entry1, entry2) => {
  const len1 = entry1.endTime - entry1.startTime;
  const len2 = entry2.endTime - entry2.startTime;
  return len2 - len1;
};

export const entryListToPositioningList = (rawEntries) => {
  if (rawEntries === undefined || rawEntries === null)
    return [];

  const entriesWithSets = rawEntries.map(entry => ({ entry, set: new Set([ entry ]) }));
  entriesWithSets.forEach(({ entry: entry1, set: set1 }) => {
    entriesWithSets.forEach(entryWithSet2 => {
      const { entry: entry2, set: set2 } = entryWithSet2;
      if (entry1 !== entry2 && entriesOverlap(entry1, entry2)) {
        merge(set1, set2);
        entryWithSet2.set = set1;
      }
    });
  });

  const allSets = [ ...new Set(entriesWithSets.map(({ set }) => set)) ];
  return allSets
    .map(set => [ ...set ].sort(compareEntries))
    .flatMap(array => array.map((entry, index, array) => ({
      ...entry,
      overlapIndex: index,
      overlapSize: array.length,
    })));
};

export const groupBy = function (list, keyLambda) {
  return list.reduce(function (collector, value) {
    (collector[keyLambda(value)] = collector[keyLambda(value)] || []).push(value);
    return collector;
  }, {});
};
