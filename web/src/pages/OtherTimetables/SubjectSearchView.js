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
import { useSearchSubjectRowStyles, useSubjectSearchStyles } from './styles';

const SubjectSearchView = ({ loadSubjectSearchResult, subjectSearchResult, subjectSearchResultLoading, addEnrollmentToSelf }) => {

  const classes = useSubjectSearchStyles();
  const [ searchString, setSearchString ] = useState('');
  const history = useHistory();
  const { pageCount, subjects, currentPage } = useMemo(() => ({
    pageCount: deepGet(subjectSearchResult, 'pageCount', 1),
    subjects: deepGet(subjectSearchResult, 'subjects', []),
    currentPage: deepGet(subjectSearchResult, 'currentPage', 1),
  }), [ subjectSearchResult ]);

  const handleChange = event => {
    setSearchString(event.target.value);
  };

  const handleSearch = (index) => {
    loadSubjectSearchResult(searchString, index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleNavigate = (subject) => {
    const searchId = deepGet(subject, 'searchId');
    if (searchId !== undefined)
      history.push(`/static-tables/${ searchId }`);
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
      { subjects.map(subject => <SubjectRow key={ subject.sid } onClick={ handleNavigate } subject={ subject }/>) }
      <OverlayCircularProgress show={ subjectSearchResultLoading }/>
    </Box>
    <Box className={ classes.buttons }>
      <Button onClick={ handlePrev } disabled={ currentPage === 1 }>Prev</Button>
      <Typography>{ currentPage }/{ pageCount }</Typography>
      <Button onClick={ handleNext } disabled={ currentPage === pageCount }>Next</Button>
    </Box>
  </Box>;
};


const SubjectRow = ({ subject, onClick }) => {
  const classes = useSearchSubjectRowStyles();
  const { name, sections, searchId } = useMemo(() => {
    return {
      name: deepGet(subject, 'name', ''),
      sections: deepGet(subject, 'sectionSet', []),
    };
  }, [ subject ]);

  return <Box className={ classes.rowBox }>
    <Box className={ classes.contentBox }>
      <Typography variant={ 'h6' } className={ classes.formationTypography }>
        { name }
      </Typography>
      { sections.map(s =>
        <Typography key={ s.id } variant={ 'body1' } color={ 'textSecondary' } className={ classes.weekDayTypography }>
          { s.name } - { s.year }
        </Typography>) }
    </Box>
    <Box className={ classes.buttonBox }>
      <IconButton onClick={ () => onClick(subject) } color={ 'secondary' }>
        <NavigateIcon/>
      </IconButton>
    </Box>
  </Box>;
};

const mapStateToProps = state => {
  return {
    subjectSearchResult: state.staticTables.subjectSearchResult,
    subjectSearchResultLoading: state.staticTables.subjectSearchResultLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSubjectSearchResult: () => {
      return dispatch(staticTables.clearSubjectSearchResult());
    },
    loadSubjectSearchResult: (searchId, index) => {
      return dispatch(staticTables.loadSubjectSearchResult(searchId, index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectSearchView);
