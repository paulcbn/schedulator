import { Checkbox, Dialog, List, ListItem, ListItemIcon } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import React, { useEffect, useState } from 'react';
import CenteredCircularProgress from '../../components/CenteredCircularProgress/CenteredCircularProgress';
import EntryRow from './EntryRow';
import { useAddEntryModalStyles } from './styles';


const AddEntryModal = ({ notOwned, componentType, subjectName, onAddEntry, isOpen, onClose, loading }) => {
  const classes = useAddEntryModalStyles();

  const [ checked, setChecked ] = useState([]);

  useEffect(() => setChecked([]), [ isOpen ]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [ ...checked ];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  if (loading)
    return <Dialog
      fullWidth={ true }
      maxWidth='lg'
      open={ isOpen }
      onClose={ onClose }
    >
      <CenteredCircularProgress/>
    </Dialog>;

  return <Dialog
    fullWidth={ true }
    maxWidth='lg'
    open={ isOpen }
    onClose={ onClose }
  >
    <Box className={ classes.dialogTitle }>
      <Typography variant="h4" component="span" className={ classes.titleTypography }>{ subjectName }</Typography>
      <Divider/>
      <Typography variant="h5" component="span" className={ classes.titleTypography }>
        Adauga participari pentru { componentType.toLowerCase() }
      </Typography>
    </Box>
    <DialogContent className={ classes.dialogContent }>

      <List dense component="div">
        { notOwned.map(entry => {
          return (
            <ListItem key={ entry.id } className={ classes.listItem } button onClick={ handleToggle(entry) }>
              <ListItemIcon>
                <Checkbox checked={ checked.indexOf(entry) !== -1 } tabIndex={ -1 } disableRipple/>
              </ListItemIcon>
              <EntryRow entry={ entry }/>
            </ListItem>
          );
        }) }
      </List>

      { notOwned.length === 0 &&
      <Typography variant={ 'subtitle1' } color={ 'textSecondary' } className={ classes.emptyTypography }>
        Nu mai exista ore de ales pentru acest { componentType.toLowerCase() }.
      </Typography>
      }

    </DialogContent>
    <DialogActions className={ classes.confirmBox }>
      <Button variant="contained" color="primary" size={ 'large' } onClick={ () => onAddEntry(checked) }>
        Confirma
      </Button>
    </DialogActions>
  </Dialog>;
};

export default AddEntryModal;
