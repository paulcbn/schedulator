import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import NavigateIcon from '@material-ui/icons/NavigateNext';
import SearchIcon from '@material-ui/icons/Search';
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OverlayCircularProgress from '../../components/OverlayCircularProgress/OverlayCircularProgress';
import { deepGet } from '../../lib';
import { staticTables } from '../../lib/actions';
import { useSearchTeacherRowStyles, useTeacherSearchStyles } from './styles';

const TeacherSearchView = ({ loadTeacherSearchResult, teacherSearchResult, teacherSearchResultLoading, addEnrollmentToSelf }) => {

  const classes = useTeacherSearchStyles();
  const [ searchString, setSearchString ] = useState('');
  const history = useHistory();
  const { pageCount, teachers, currentPage } = useMemo(() => ({
    pageCount: deepGet(teacherSearchResult, 'pageCount', 1),
    teachers: deepGet(teacherSearchResult, 'teachers', []),
    currentPage: deepGet(teacherSearchResult, 'currentPage', 1),
  }), [ teacherSearchResult ]);

  const handleChange = event => {
    setSearchString(event.target.value);
  };

  const handleSearch = (index) => {
    loadTeacherSearchResult(searchString, index);
  };

  const handleNavigate = (teacher) => {
    const searchId = deepGet(teacher, 'searchId');
    if (searchId !== undefined)
      history.push(`/static-tables/${ searchId }`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleNext = () => {
    handleSearch(currentPage + 1);
  };


  const handlePrev = () => {
    handleSearch(currentPage - 1);
  };


  return <Box className={ classes.root }>
    <Box className={ classes.title }>
      <form className={ classes.searchBoxRow } onSubmit={ handleFormSubmit }>
        <TextField
          className={ classes.searchBox }
          value={ searchString }
          onChange={ handleChange }
          variant={ 'outlined' }
          label="Numele materiei"
        />
        <IconButton
          color="primary"
          className={ classes.searchButton }
          onClick={ () => handleSearch() }
        >
          <SearchIcon/>
        </IconButton>
      </form>
    </Box>
    <Box className={ classes.content }>
      { teachers.map(teacher => <TeacherRow key={ teacher.sid } onClick={ handleNavigate } teacher={ teacher }/>) }
      <OverlayCircularProgress show={ teacherSearchResultLoading }/>
    </Box>
    <Box className={ classes.buttons }>
      <Button onClick={ handlePrev } disabled={ currentPage === 1 }>Prev</Button>
      <Typography>{ currentPage }/{ pageCount }</Typography>
      <Button onClick={ handleNext } disabled={ currentPage === pageCount }>Next</Button>
    </Box>
  </Box>;
};


const TeacherRow = ({ teacher, onClick }) => {
  const classes = useSearchTeacherRowStyles();
  const { name } = useMemo(() => {
    return {
      name: deepGet(teacher, 'name', ''),
    };
  }, [ teacher ]);

  return <Box className={ classes.rowBox }>
    <Box className={ classes.contentBox }>
      <Typography variant={ 'h6' } className={ classes.formationTypography }>
        { name }
      </Typography>
    </Box>
    <Box className={ classes.buttonBox }>
      <IconButton onClick={ () => onClick(teacher) } color={ 'secondary' }>
        <NavigateIcon/>
      </IconButton>
    </Box>
  </Box>;
};

const mapStateToProps = state => {
  return {
    teacherSearchResult: state.staticTables.teacherSearchResult,
    teacherSearchResultLoading: state.staticTables.teacherSearchResultLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearTeacherSearchResult: () => {
      return dispatch(staticTables.clearTeacherSearchResult());
    },
    loadTeacherSearchResult: (searchId, index) => {
      return dispatch(staticTables.loadTeacherSearchResult(searchId, index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSearchView);
