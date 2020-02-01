import { Dialog, DialogTitle, Divider, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import React from 'react';
import useStyles from './styles';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, text, data }) => {

  const classes = useStyles();

  const handleConfirm = () => {
    onConfirm(data);
    onClose();
  };

  return <Dialog
    fullWidth={ true }
    maxWidth='sm'
    open={ isOpen }
    onClose={ onClose }
  >
    <DialogTitle>
      <Typography component="span" variant='h5'>{ title }</Typography>
      <Divider/>
      <Typography component="span" variant='h6'>{ text }</Typography>
    </DialogTitle>
    <DialogActions>
      <Button onClick={ onClose } variant={ "outlined" }>Anuleaza</Button>
      <Box className={ classes.flexExpander }/>
      <Button onClick={ handleConfirm } variant={ "contained" } color={ "primary" }>Confirma</Button>
    </DialogActions>
  </Dialog>;
};
export default ConfirmationModal;
