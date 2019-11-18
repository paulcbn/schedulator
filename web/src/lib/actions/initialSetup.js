import { API } from '../index';

export const loadSections = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SECTIONS_LOADING' });
    API.get('/api/sections/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'SECTIONS_LOADED', data });
        else {
          dispatch({ type: 'SECTIONS_ERROR', data });
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
          dispatch({ type: 'SUBJECTS_LOADED', data });
        } else {
          dispatch({ type: 'SUBJECTS_ERROR', data });
        }
      });
  };
};

export const loadFormations = (sectionId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'FORMATIONS_LOADING' });
    API.get(`/api/formations/`, { params: { 'section_id': sectionId } })
      .then(({ data, status }) => {
        if (status === 200) {
          dispatch({ type: 'FORMATIONS_LOADED', data });
        } else {
          dispatch({ type: 'FORMATIONS_ERROR', data });
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

    const subject_ids = selectedSubjects.map(s => s.sid);
    const formation_names = selectedFormations.map(f => f.name);

    API.post('/api/initiate-user/', { subject_ids, formation_names }).then(({ data, status }) => {
      console.log('TODO: REFETCH TIMETABLE');
      console.log({ data, status });
    });
  };
};
