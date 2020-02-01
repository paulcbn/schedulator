const initialState = {
  currentEnrollmentStateLoading: false,
  currentEnrollmentStateError: null,
  currentEnrollmentState: [],

  subjectComponentState: null,
  subjectComponentStateLoading: false,
  subjectComponentStateError: null,

  addEntriesLoading: false,
  addEntriesError: null,

  removeEntryLoading: false,
  removeEntryError: null,

  removeEnrollmentLoading: false,
  removeEnrollmentError: null,

  subjectSearchResult: null,
  subjectSearchString: "",
  subjectSearchResultError: null,
  subjectSearchResultLoading: false,

  addEnrollmentLoading: false,
  addEnrollmentError: null,
};

export default function enrollmentManager(state = initialState, action) {
  switch (action.type) {
    case 'CURRENT_ENROLLMENT_STATE_LOADING':
      return {
        ...state,
        currentEnrollmentStateLoading: true,
        currentEnrollmentStateError: null,
      };
    case 'CURRENT_ENROLLMENT_STATE_LOADED':
      return {
        ...state,
        currentEnrollmentStateLoading: false,
        currentEnrollmentStateError: null,
        currentEnrollmentState: action.data,
      };
    case 'CURRENT_ENROLLMENT_STATE_ERROR':
      return {
        ...state,
        currentEnrollmentStateLoading: false,
        currentEnrollmentStateError: action.data,
      };


    case 'SUBJECT_COMPONENT_STATE_LOADING':
      return {
        ...state,
        subjectComponentStateLoading: true,
        subjectComponentStateError: null,
      };
    case 'SUBJECT_COMPONENT_STATE_LOADED':
      return {
        ...state,
        subjectComponentStateLoading: false,
        subjectComponentStateError: null,
        subjectComponentState: action.data,
      };
    case 'SUBJECT_COMPONENT_STATE_ERROR':
      return {
        ...state,
        subjectComponentStateLoading: false,
        subjectComponentStateError: action.data,
      };
    case 'SUBJECT_COMPONENT_STATE_CLEAR':
      return {
        ...state,
        subjectComponentStateLoading: false,
        subjectComponentStateError: null,
        subjectComponentState: null,
      };


    case 'ADD_ENTRIES_LOADING':
      return {
        ...state,
        addEntriesLoading: true,
        addEntriesError: null,
      };

    case 'ADD_ENTRIES_ERROR':
      return {
        ...state,
        addEntriesLoading: false,
        addEntriesError: action.data,
      };

    case 'ADD_ENTRIES_LOADED':
      return {
        ...state,
        addEntriesLoading: false,
        addEntriesError: null,
      };


    case 'REMOVE_ENTRY_LOADING':
      return {
        ...state,
        removeEntryLoading: true,
        removeEntryError: action.data,
      };

    case 'REMOVE_ENTRY_ERROR':
      return {
        ...state,
        removeEntryLoading: false,
        removeEntryError: action.data,
      };

    case 'REMOVE_ENTRY_LOADED':
      return {
        ...state,
        removeEntryLoading: false,
        removeEntryError: null,
      };

    case 'REMOVE_ENROLLMENT_LOADING':
      return {
        ...state,
        removeEnrollmentLoading: true,
        removeEnrollmentError: action.data,
      };

    case 'REMOVE_ENROLLMENT_ERROR':
      return {
        ...state,
        removeEnrollmentLoading: false,
        removeEnrollmentError: action.data,
      };

    case 'REMOVE_ENROLLMENT_LOADED':
      return {
        ...state,
        removeEnrollmentLoading: false,
        removeEnrollmentError: null,
      };


    case 'SUBJECT_SEARCH_RESULT_LOADING':
      return {
        ...state,
        subjectSearchResultLoading: true,
        subjectSearchResultError: null,
        subjectSearchString: action.data,
      };
    case 'SUBJECT_SEARCH_RESULT_LOADED':
      return {
        ...state,
        subjectSearchResultLoading: false,
        subjectSearchResultError: null,
        subjectSearchResult: action.data,
      };
    case 'SUBJECT_SEARCH_RESULT_ERROR':
      return {
        ...state,
        subjectSearchResultLoading: false,
        subjectSearchResultError: action.data,
      };
    case 'SUBJECT_SEARCH_RESULT_CLEAR':
      return {
        ...state,
        subjectSearchResultLoading: false,
        subjectSearchResultError: null,
        subjectSearchResult: [],
        subjectSearchString: '',
      };


    case 'ADD_ENROLLMENT_LOADING':
      return {
        ...state,
        addEnrollmentLoading: true,
        addEnrollmentError: null,
      };

    case 'ADD_ENROLLMENT_ERROR':
      return {
        ...state,
        addEnrollmentLoading: false,
        addEnrollmentError: action.data,
      };

    case 'ADD_ENROLLMENT_LOADED':
      return {
        ...state,
        addEnrollmentLoading: false,
        addEnrollmentError: null,
      };


    default:
      return state;
  }
}
