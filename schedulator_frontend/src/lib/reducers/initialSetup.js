const initialState = {
  sections: [],
  formations: [],
  subjects: [],
  sectionsLoading: false,
  formationsLoading: false,
  subjectsLoading: false,
  sectionsErrors: {},
  formationsErrors: {},
  subjectsErrors: {},
  selectedSection: null,
  selectedFormations: [],
  selectedSubjects: [],
};


export default function initialSetup(state = initialState, action) {
  switch (action.type) {
    case 'SECTIONS_LOADING':
      return { ...state, sectionsLoading: true, sectionsErrors: {}, sections: [] };
    case 'SECTIONS_LOADED':
      return { ...state, sectionsLoading: false, sectionsErrors: {}, sections: action.data };
    case 'SECTIONS_ERROR':
      return { ...state, sectionsLoading: false, sectionsErrors: action.data, sections: [] };

    case 'SECTION_SELECTED':
      return { ...state, selectedSection: action.data };

    case 'FORMATIONS_LOADING':
      return { ...state, formationsLoading: true, formationsErrors: {}, formations: [] };
    case 'FORMATIONS_LOADED':
      return { ...state, formationsLoading: false, formationsErrors: {}, formations: action.data };
    case 'FORMATIONS_ERROR':
      return { ...state, formationsLoading: false, formationsErrors: action.data, formations: [] };

    case 'FORMATIONS_SELECTED':
      return { ...state, selectedFormations: action.data };


    case 'SUBJECTS_LOADING':
      return { ...state, subjectsLoading: true, subjectsErrors: {}, subjects: [] };
    case 'SUBJECTS_LOADED':
      return { ...state, subjectsLoading: false, subjectsErrors: {}, subjects: action.data };
    case 'SUBJECTS_ERROR':
      return { ...state, subjectsLoading: false, subjectsErrors: action.data, subjects: [] };


    case 'SUBJECTS_SELECTED':
      return { ...state, selectedSubjects: action.data };


    default:
      return state;
  }
}
