const initialState = {
  currentSemesterStatus: {
    week: 1,
    isVacation: false,
    nextWeekDelta: 1,
  },
  currentSemesterStatusLoading: false,
  currentSemesterStatusError: false,
};


export default function currentSemesterStatus(state = initialState, action) {
  switch (action.type) {
    case 'CURRENT_SEMESTER_STATUS_LOADED':
      return { ...state, currentSemesterStatus: action.data };

    case 'CURRENT_SEMESTER_STATUS_LOADING':
      return { ...state, currentSemesterStatusLoading: true, currentSemesterStatusError: false };

    case 'CURRENT_SEMESTER_STATUS_ERROR':
      return { ...state, currentSemesterStatusLoading: false, currentSemesterStatusError: true };

    default:
      return state;
  }
}
