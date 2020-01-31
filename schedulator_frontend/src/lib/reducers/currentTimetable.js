const initialState = {
  ownTimetableEntries: [],
  ownTimetableLoading: false,
  ownTimetableErrors: null,

  personalTimetableEntries: [],
  personalTimetableEntriesLoading: false,
  personalTimetableEntriesError: null,

  addPersonalTimetableEntryLoading: false,
  addPersonalTimetableEntryError: {},

  removePersonalTimetableEntryLoading: false,
  removePersonalTimetableEntryError: false,

};


export default function currentTimetable(state = initialState, action) {
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

    case 'PERSONAL_TIMETABLE_ENTRIES_LOADING':
      return { ...state, personalTimetableLoading: true, personalTimetableErrors: {}, personalTimetableEntries: [] };
    case 'PERSONAL_TIMETABLE_ENTRIES_LOADED':
      return {
        ...state,
        personalTimetableLoading: false,
        personalTimetableErrors: {},
        personalTimetableEntries: action.data,
      };
    case 'PERSONAL_TIMETABLE_ENTRIES_ERROR':
      return {
        ...state,
        personalTimetableLoading: false,
        personalTimetableErrors: action.data,
        personalTimetableEntries: [],
      };

    case 'ADD_PERSONAL_TIMETABLE_ENTRY_LOADING':
      return { ...state, addPersonalTimetableEntryError: {}, addPersonalTimetableEntryLoading: true };
    case 'ADD_PERSONAL_TIMETABLE_ENTRY_LOADED':
      return { ...state, addPersonalTimetableEntryError: {}, addPersonalTimetableEntryLoading: false };
    case 'ADD_PERSONAL_TIMETABLE_ENTRY_ERROR':
      return { ...state, addPersonalTimetableEntryError: action.data, addPersonalTimetableEntryLoading: false };


    case 'REMOVE_PERSONAL_TIMETABLE_ENTRY_LOADING':
      return { ...state, removePersonalTimetableEntryError: false, removePersonalTimetableEntryLoading: true };
    case 'REMOVE_PERSONAL_TIMETABLE_ENTRY_LOADED':
      return { ...state, removePersonalTimetableEntryError: false, removePersonalTimetableEntryLoading: false };
    case 'REMOVE_PERSONAL_TIMETABLE_ENTRY_ERROR':
      return { ...state, removePersonalTimetableEntryError: action.data, removePersonalTimetableEntryLoading: false };


    default:
      return state;
  }
}
