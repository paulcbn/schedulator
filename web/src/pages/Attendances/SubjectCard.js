import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ValidIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import WarningIcon from '@material-ui/icons/HelpOutline';
import ErrorIcon from '@material-ui/icons/HighlightOff';
import React, { useMemo } from 'react';
import { deepGet } from '../../lib';
import { useComponentRowStyles, useSubjectCardStyles } from './styles';


const SubjectCard = ({ enrollmentData, onDeleteSubject, onEditComponent }) => {
  const classes = useSubjectCardStyles();

  const { components } = useMemo(() => ({
    components: deepGet(enrollmentData, 'components', []),
  }), [ enrollmentData ]);

  return <Card className={ classes.card }>
    <CardContent className={ classes.cardContent }>
      <Typography variant="h5">{ enrollmentData.name }</Typography>
      <Divider/>
      { components.map(comp => <ComponentRow key={ comp.name } componentData={ comp } onEdit={ onEditComponent }/>) }
      <Divider/>
    </CardContent>
    <CardActions>
      <Box className={ classes.flexExpander }/>
      { onDeleteSubject &&
      <IconButton className={ classes.deleteButton }
                  onClick={ () => onDeleteSubject(enrollmentData) }>
        <DeleteIcon/>
      </IconButton> }
    </CardActions>
  </Card>;
};

const ComponentRow = ({ componentData, onEdit }) => {
  const classes = useComponentRowStyles();

  const { name, entries } = useMemo(() => ({
    name: deepGet(componentData, 'name', ''),
    entries: deepGet(componentData, 'entries', []),
  }), [ componentData ]);

  const { iconComponent, tooltipText, formations } = useMemo(() => {
    let iconComponent;
    let tooltipText;
    let formations = entries.map(entry => deepGet(entry, 'formation.name', null)).join(', ');

    if (entries.length === 0) {
      iconComponent = <ErrorIcon className={ classes.errorIcon }/>;
      tooltipText = 'Nu ai nicio intrare aleasa pentru aceasa componenta.';
    } else if (entries.length === 1) {
      iconComponent = <ValidIcon className={ classes.validIcon }/>;
      tooltipText = 'Ai fix o intrare aleasa pentru aceasta componenta.';
    } else {
      iconComponent = <WarningIcon className={ classes.warningIcon }/>;
      tooltipText = 'Ai mai mult de o intrare aleasa pentru aceasta componenta.';
    }
    return { iconComponent, tooltipText, formations };
  }, [ entries, classes ]);

  return <Box className={ classes.rowBox }>
    <Tooltip title={ tooltipText } placement="bottom-start">
      <Box className={ classes.title }>
        { iconComponent }
        &nbsp;
        <Typography variant={ 'h6' }>{ name }</Typography>
        &nbsp;-&nbsp;
        <Typography variant={ 'h6' } color='textSecondary'>{ formations } </Typography>
      </Box>
    </Tooltip>
    <Box className={ classes.flexExpander }/>
    { onEdit &&
    <IconButton onClick={ () => onEdit(componentData) } size='small'>
      <EditIcon/>
    </IconButton>
    }
  </Box>;
};

export default SubjectCard;

