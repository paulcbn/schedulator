import { keysToCamel, keysToUnderscore } from '../api';
import { API } from '../index';
import { loadOwnData } from './currentStatus';

export const loadSections = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SECTIONS_LOADING' });
    API.get('/api/sections/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'SECTIONS_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'SECTIONS_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const loadSubjects = (sectionId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SUBJECTS_LOADING' });
    API.get(`/api/sections/${ sectionId }/default-subjects/`)
      .then(({ data, status }) => {
        if (status === 200) {
          dispatch({ type: 'SUBJECTS_LOADED', data: keysToCamel(data) });
        } else {
          dispatch({ type: 'SUBJECTS_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const loadFormations = (sectionId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'FORMATIONS_LOADING' });
    API.get(`/api/formations/`, { params: keysToUnderscore({ sectionId }) })
      .then(({ data, status }) => {
        if (status === 200) {
          dispatch({ type: 'FORMATIONS_LOADED', data: keysToCamel(data) });
        } else {
          dispatch({ type: 'FORMATIONS_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const selectSection = (section) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SECTION_SELECTED', data: section });
    if (section.id !== undefined) {
      dispatch(loadFormations(section.id));
      dispatch(loadSubjects(section.id));
    }
  };
};

export const selectFormations = (formations) => {
  return { type: 'FORMATIONS_SELECTED', data: formations };
};

export const selectSubjects = (subjects) => {
  return { type: 'SUBJECTS_SELECTED', data: subjects };
};

export const confirmSelection = () => {
  return (dispatch, getState) => {
    const { initialSetup: { selectedFormations, selectedSubjects } } = getState();

    const subjectIds = selectedSubjects.map(s => s.sid);
    const formationNames = selectedFormations.map(f => f.name);

    API.post('/api/initiate-user/', keysToUnderscore({ subjectIds, formationNames })).then(({ data, status }) => {
      dispatch(loadOwnData());
    });
  };
};
