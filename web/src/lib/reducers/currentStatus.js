const initialState = {
  ownTimetableEntries: [],
  currentWeek: null,
  ownTimetableLoading: false,
  ownTimetableErrors: {},
};


export default function currentStatus(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_WEEK':
      return { ...state, currentWeek: action.data };

    case 'OWN_TIMETABLE_LOADING':
      return { ...state, ownTimetableLoading: true, ownTimetableErrors: {}, ownTimetableEntries: [] };
    case 'OWN_TIMETABLE_LOADED':
      return { ...state, ownTimetableLoading: false, ownTimetableErrors: {}, ownTimetableEntries: action.data };
    case 'OWN_TIMETABLE_ERROR':
      return { ...state, ownTimetableLoading: false, ownTimetableErrors: action.data, ownTimetableEntries: [] };
    case 'CLEAR_CURRENT_STATUS':
      return { ownTimetableEntries: [], currentWeek: null, ownTimetableLoading: false, ownTimetableErrors: {} };

    default:
      return state;
  }
}
