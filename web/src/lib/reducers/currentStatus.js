const initialState = {
  ownTimetableEntries: [],
  ownTimetableLoading: false,
  ownTimetableErrors: {},
};


export default function currentStatus(state = initialState, action) {
  switch (action.type) {
    case 'OWN_TIMETABLE_LOADING':
      return { ...state, ownTimetableLoading: true, ownTimetableErrors: {}, ownTimetableEntries: [] };
    case 'OWN_TIMETABLE_LOADED':
      return { ...state, ownTimetableLoading: false, ownTimetableErrors: {}, ownTimetableEntries: action.data };
    case 'OWN_TIMETABLE_ERROR':
      return { ...state, ownTimetableLoading: false, ownTimetableErrors: action.data, ownTimetableEntries: [] };

    default:
      return state;
  }
}
