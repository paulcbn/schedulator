const initialState = {
  ownTimetableEntries: [],
  ownTimetableLoading: false,
  ownTimetableErrors: null,
};


export default function currentTimetable(state = initialState, action) {
  switch (action.type) {
    case 'OWN_TIMETABLE_LOADING':
      return { ...state, ownTimetableLoading: true, ownTimetableErrors: {}, ownTimetableEntries: [] };
    case 'OWN_TIMETABLE_LOADED':
      return { ...state, ownTimetableLoading: false, ownTimetableErrors: {}, ownTimetableEntries: action.data };
    case 'OWN_TIMETABLE_ERROR':
      return { ...state, ownTimetableLoading: false, ownTimetableErrors: action.data, ownTimetableEntries: [] };

    case 'CLEAR_CURRENT_STATUS':
      return { ownTimetableEntries: [], ownTimetableLoading: false, ownTimetableErrors: {} };

    default:
      return state;
  }
}
