export const groupBy = function (list, keyLambda) {
  return list.reduce(function (collector, value) {
    (collector[keyLambda(value)] = collector[keyLambda(value)] || []).push(value);
    return collector;
  }, {});
};
