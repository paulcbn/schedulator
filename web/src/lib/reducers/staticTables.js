const initialState = {
  sections: [],
  sectionsLoading: true,
  sectionsErrors: {},
  staticTableHierarchy: null,
  staticTableHierarchyLoading: true,
  staticTableHierarchyErrors: {},
  staticTable: null,
  staticTableLoading: true,
  staticTableErrors: {},
};

export default function staticTables(state = initialState, action) {
  switch (action.type) {
    case 'STATIC_SECTIONS_LOADING':
      return { ...state, sectionsLoading: true, sectionsErrors: {}, sections: [] };
    case 'STATIC_SECTIONS_LOADED':
      return { ...state, sectionsLoading: false, sectionsErrors: {}, sections: action.data };
    case 'STATIC_SECTIONS_ERROR':
      return { ...state, sectionsLoading: false, sectionsErrors: action.data, sections: [] };

    case 'STATIC_TABLE_HIERARCHY_LOADING':
      return {
        ...state,
        staticTableHierarchyLoading: true,
        staticTableHierarchyErrors: {},
        staticTableHierarchy: null,
      };
    case 'STATIC_TABLE_HIERARCHY_LOADED':
      return {
        ...state,
        staticTableHierarchyLoading: false,
        staticTableHierarchyErrors: {},
        staticTableHierarchy: action.data,
      };
    case 'STATIC_TABLE_HIERARCHY_ERROR':
      return {
        ...state,
        staticTableHierarchyLoading: false,
        staticTableHierarchyErrors: action.data,
        staticTableHierarchy: null,
      };

    case 'STATIC_TABLE_LOADING':
      return { ...state, staticTableLoading: true, staticTableErrors: {}, staticTable: null };
    case 'STATIC_TABLE_LOADED':
      return { ...state, staticTableLoading: false, staticTableErrors: {}, staticTable: action.data };
    case 'STATIC_TABLE_ERROR':
      return { ...state, staticTableLoading: false, staticTableErrors: action.data, staticTable: null };

    default:
      return state;
  }
}
