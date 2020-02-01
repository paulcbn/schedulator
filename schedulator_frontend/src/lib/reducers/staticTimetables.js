const initialState = {
  sections: [],
  sectionsLoading: true,
  sectionsErrors: {},

  staticTimetableHierarchy: null,
  staticTimetableHierarchyLoading: true,
  staticTimetableHierarchyErrors: {},

  staticTimetable: null,
  staticTimetableLoading: true,
  staticTimetableErrors: {},

  subjectSearchResult: [],
  subjectSearchString: '',
  subjectSearchResultError: null,
  subjectSearchResultLoading: false,

  teacherSearchResult: [],
  teacherSearchString: '',
  teacherSearchResultError: null,
  teacherSearchResultLoading: false,
};

export default function staticTimetables(state = initialState, action) {
  switch (action.type) {
    case 'STATIC_TIMETABLES_SECTIONS_LOADING':
      return { ...state, sectionsLoading: true, sectionsErrors: {}, sections: [] };
    case 'STATIC_TIMETABLES_SECTIONS_LOADED':
      return { ...state, sectionsLoading: false, sectionsErrors: {}, sections: action.data };
    case 'STATIC_TIMETABLES_SECTIONS_ERROR':
      return { ...state, sectionsLoading: false, sectionsErrors: action.data, sections: [] };

    case 'STATIC_TIMETABLE_HIERARCHY_LOADING':
      return {
        ...state,
        staticTimetableHierarchyLoading: true,
        staticTimetableHierarchyErrors: {},
        staticTimetableHierarchy: null,
      };
    case 'STATIC_TIMETABLE_HIERARCHY_LOADED':
      return {
        ...state,
        staticTimetableHierarchyLoading: false,
        staticTimetableHierarchyErrors: {},
        staticTimetableHierarchy: action.data,
      };
    case 'STATIC_TIMETABLE_HIERARCHY_ERROR':
      return {
        ...state,
        staticTimetableHierarchyLoading: false,
        staticTimetableHierarchyErrors: action.data,
        staticTimetableHierarchy: null,
      };

    case 'STATIC_TIMETABLE_LOADING':
      return { ...state, staticTimetableLoading: true, staticTimetableErrors: {}, staticTimetable: null };
    case 'STATIC_TIMETABLE_LOADED':
      return { ...state, staticTimetableLoading: false, staticTimetableErrors: {}, staticTimetable: action.data };
    case 'STATIC_TIMETABLE_ERROR':
      return { ...state, staticTimetableLoading: false, staticTimetableErrors: action.data, staticTimetable: null };


    case 'STATIC_TIMETABLE_SUBJECT_SEARCH_RESULT_LOADING':
      return {
        ...state,
        subjectSearchResultLoading: true,
        subjectSearchResultError: null,
        subjectSearchString: action.data,
      };
    case 'STATIC_TIMETABLE_SUBJECT_SEARCH_RESULT_LOADED':
      return {
        ...state,
        subjectSearchResultLoading: false,
        subjectSearchResultError: null,
        subjectSearchResult: action.data,
      };
    case 'STATIC_TIMETABLE_SUBJECT_SEARCH_RESULT_ERROR':
      return {
        ...state,
        subjectSearchResultLoading: false,
        subjectSearchResultError: action.data,
      };
    case 'STATIC_TIMETABLE_SUBJECT_SEARCH_RESULT_CLEAR':
      return {
        ...state,
        subjectSearchResultLoading: false,
        subjectSearchResultError: null,
        subjectSearchResult: [],
        subjectSearchString: '',
      };

    case 'STATIC_TIMETABLE_TEACHER_SEARCH_RESULT_LOADING':
      return {
        ...state,
        teacherSearchResultLoading: true,
        teacherSearchResultError: null,
        teacherSearchString: action.data,
      };
    case 'STATIC_TIMETABLE_TEACHER_SEARCH_RESULT_LOADED':
      return {
        ...state,
        teacherSearchResultLoading: false,
        teacherSearchResultError: null,
        teacherSearchResult: action.data,
      };
    case 'STATIC_TIMETABLE_TEACHER_SEARCH_RESULT_ERROR':
      return {
        ...state,
        teacherSearchResultLoading: false,
        teacherSearchResultError: action.data,
      };
    case 'STATIC_TIMETABLE_TEACHER_SEARCH_RESULT_CLEAR':
      return {
        ...state,
        teacherSearchResultLoading: false,
        teacherSearchResultError: null,
        teacherSearchResult: [],
        teacherSearchString: '',
      };

    default:
      return state;
  }
}
