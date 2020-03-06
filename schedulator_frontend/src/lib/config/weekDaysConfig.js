export const weekDayCodes = {
  'Mo': { name: 'Luni', index: 0 },
  'Tu': { name: 'Marti', index: 1 },
  'We': { name: 'Miercuri', index: 2 },
  'Th': { name: 'Joi', index: 3 },
  'Fr': { name: 'Vineri', index: 4 },
};

export const weekDayList = Object.entries(weekDayCodes)
  .sort(([ _1, { index1 } ], [ _2, { index2 } ]) => index1 - index2)
  .map(([ code, day ]) => ({ code, ...day }));

// The result is something like this:
// const weekDayList = [
//   {
//     code: 'Mo',
//     name: 'Luni',
//   },
//   ...
// ];
