const initialState = {
  customTimetableEntries: [],
  customTimetableEntriesLoading: false,
  customTimetableEntriesError: null,

  addCustomTimetableEntryLoading: false,
  addCustomTimetableEntryError: {},

  removeCustomTimetableEntryLoading: false,
  removeCustomTimetableEntryError: false,
};


export default function customTimetableEntries(state = initialState, action) {
  switch (action.type) {

    case 'CUSTOM_TIMETABLE_ENTRIES_LOADING':
      return { ...state, customTimetableLoading: true, customTimetableErrors: {} };
    case 'CUSTOM_TIMETABLE_ENTRIES_LOADED':
      return {
        ...state,
        customTimetableLoading: false,
        customTimetableErrors: {},
        customTimetableEntries: action.data,
      };
    case 'CUSTOM_TIMETABLE_ENTRIES_ERROR':
      return {
        ...state,
        customTimetableLoading: false,
        customTimetableErrors: action.data,
      };

    case 'CUSTOM_TIMETABLE_ENTRIES_ADD_LOADING':
      return { ...state, addCustomTimetableEntryError: {}, addCustomTimetableEntryLoading: true };
    case 'CUSTOM_TIMETABLE_ENTRIES_ADD_LOADED':
      return { ...state, addCustomTimetableEntryError: {}, addCustomTimetableEntryLoading: false };
    case 'CUSTOM_TIMETABLE_ENTRIES_ADD_ERROR':
      return { ...state, addCustomTimetableEntryError: action.data, addCustomTimetableEntryLoading: false };


    case 'CUSTOM_TIMETABLE_ENTRIES_REMOVE_LOADING':
      return { ...state, removeCustomTimetableEntryError: false, removeCustomTimetableEntryLoading: true };
    case 'CUSTOM_TIMETABLE_ENTRIES_REMOVE_LOADED':
      return { ...state, removeCustomTimetableEntryError: false, removeCustomTimetableEntryLoading: false };
    case 'CUSTOM_TIMETABLE_ENTRIES_REMOVE_ERROR':
      return { ...state, removeCustomTimetableEntryError: action.data, removeCustomTimetableEntryLoading: false };


    default:
      return state;
  }
}
