const initialState = {
  currentWeekStatus: {
    week: 1,
    isVacation: false,
    nextWeekDelta: 1,
  },
  currentWeekStatusLoading: false,
  currentWeekStatusError: false,
};


export default function currentWeek(state = initialState, action) {
  switch (action.type) {
    case 'CURRENT_WEEK_STATUS_LOADED':
      return { ...state, currentWeekStatus: action.data };

    case 'CURRENT_WEEK_STATUS_LOADING':
      return { ...state, currentWeekStatusLoading: true, currentWeekStatusError: false };

    case 'CURRENT_WEEK_STATUS_ERROR':
      return { ...state, currentWeekStatusLoading: false, currentWeekStatusError: true };

    default:
      return state;
  }
}
