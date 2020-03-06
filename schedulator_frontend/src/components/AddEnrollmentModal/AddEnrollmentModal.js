import { Dialog, DialogContent, DialogTitle, Divider, Typography } from '@material-ui/core';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import React, { useMemo, useState } from 'react';
import { connect } from "react-redux";
import { deepGet } from "../../lib/utils";
import { enrollmentManager } from "../../lib/actions";
import { OverlayCircularProgress } from "../OverlayCircularProgress";
import useStyles, { useSubjectRowStyles } from './styles';

const AddEnrollmentModal = ({ isOpen, onClose, clearSubjectSearchResult, loadSubjectSearchResult, subjectSearchResult, subjectSearchResultLoading, addEnrollmentToSelf }) => {

  const classes = useStyles();
  const [searchString, setSearchString] = useState('');

  const { pageCount, subjects, currentPage } = useMemo(() => ({
    pageCount: deepGet(subjectSearchResult, 'pageCount', 1),
    subjects: deepGet(subjectSearchResult, 'subjects', []),
    currentPage: deepGet(subjectSearchResult, 'currentPage', 1),
  }), [subjectSearchResult]);

  const handleChange = event => {
    setSearchString(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = (index) => {
    loadSubjectSearchResult(searchString, index);
  };

  const handleAdd = (subject) => {
    const subjectId = deepGet(subject, 'sid');
    addEnrollmentToSelf(subjectId);
  };

  const handleNext = () => {
    handleSearch(currentPage + 1);
  };


  const handlePrev = () => {
    handleSearch(currentPage - 1);
  };


  return <Dialog
    fullWidth={ true }
    maxWidth='lg'
    open={ isOpen }
    onClose={ onClose }
  >
    <DialogTitle>
      <Typography variant='h5' component='span'>Adauga materii</Typography>
      <Divider/>
      <form className={ classes.searchBoxRow } onSubmit={ handleFormSubmit }>
        <TextField
          className={ classes.searchBox }
          value={ searchString }
          onChange={ handleChange }
          variant={ "outlined" }
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
    </DialogTitle>
    <DialogContent className={ classes.dialogContent }>
      { subjects.map(subject => <SubjectRow key={ subject.sid } onAdd={ handleAdd } subject={ subject }/>) }
      <OverlayCircularProgress show={ subjectSearchResultLoading }/>
    </DialogContent>
    <DialogActions>
      <Button onClick={ handlePrev } disabled={ currentPage === 1 }>Prev</Button>
      <Typography>{ currentPage }/{ pageCount }</Typography>
      <Button onClick={ handleNext } disabled={ currentPage === pageCount }>Next</Button>
    </DialogActions>
  </Dialog>;
};


const SubjectRow = ({ subject, onAdd }) => {
  const classes = useSubjectRowStyles();
  const { name, sections } = useMemo(() => {
    return {
      name: deepGet(subject, 'name', ''),
      sections: deepGet(subject, 'sectionSet', []),
    };
  }, [subject]);

  return <Box className={ classes.rowBox }>
    <Box className={ classes.contentBox }>
      <Typography variant={ 'h6' } className={ classes.formationTypography }>
        { name }
      </Typography>
      { sections.map(s =>
        <Typography key={ s.id } variant={ 'body1' } color={ "textSecondary" } className={ classes.weekDayTypography }>
          { s.name } - { s.year }
        </Typography>) }
    </Box>
    <Box className={ classes.buttonBox }>
      <IconButton onClick={ () => onAdd(subject) } color={ "secondary" }>
        <AddIcon/>
      </IconButton>
    </Box>
  </Box>;
};

const mapStateToProps = state => {
  return {
    subjectSearchResult: state.enrollmentManager.subjectSearchResult,
    subjectSearchResultLoading: state.enrollmentManager.subjectSearchResultLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSubjectSearchResult: () => {
      return dispatch(enrollmentManager.clearSubjectSearchResult());
    },
    loadSubjectSearchResult: (searchId, index) => {
      return dispatch(enrollmentManager.loadSubjectSearchResult(searchId, index));
    },
    addEnrollmentToSelf: (subjectId) => {
      return dispatch(enrollmentManager.addEnrollmentToSelf(subjectId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEnrollmentModal);
