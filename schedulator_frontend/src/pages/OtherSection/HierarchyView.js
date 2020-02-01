import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/core/SvgIcon/SvgIcon';
import React, { useMemo, useState } from 'react';
import { deepGet } from '../../lib';
import { useHierarchyViewStyles } from './styles';

const HierarchyView = ({ staticTimetableHierarchy, showTitle, onClick } = { showTitle: false }) => {
  const classes = useHierarchyViewStyles();

  const [ expandedId, setExpandedId ] = useState(false);
  const handleChange = (sectionId, isExpanded) => {
    setExpandedId(isExpanded ? sectionId : false);
  };

  const { formationName, searchId, children } = useMemo(() => ({
    formationName: deepGet(staticTimetableHierarchy, 'formation.name', '-'),
    searchId: deepGet(staticTimetableHierarchy, 'searchId', ''),
    children: deepGet(staticTimetableHierarchy, 'children', []),
  }), [ staticTimetableHierarchy ]);


  return <Box className={ classes.rootBox }>
    { showTitle && <Box className={ classes.titleBox }>
      <Typography variant='h5'>{ formationName }</Typography>
    </Box> }
    { searchId !== '' &&
    <Box className={ classes.bodyBox }>
      <Button
        variant='outlined'
        color='primary'
        onClick={ () => onClick(searchId) }
        className={ classes.marginRight }>
        { formationName }
      </Button>
    </Box> }
    <Box className={ classes.bodyBox }>
      { children.map(h => {
        const formationName = deepGet(h, 'formation.name', '-');
        const searchId = deepGet(h, 'searchId', '');

        if (searchId !== '')
          return <Button
            key={ formationName }
            variant='outlined' color='primary'
            onClick={ () => onClick(searchId) }
            className={ classes.marginRight }>
            { formationName }
          </Button>;

        return <ExpansionPanel
          key={ formationName }
          expanded={ expandedId === formationName }
          onChange={ (_, isExpanded) => handleChange(formationName, isExpanded) }
          className={ classes.expansionPanel }>
          <ExpansionPanelSummary className={ classes.heading } expandIcon={ <ExpandMoreIcon/> }>
            <Typography>{ formationName }</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={ classes.expansionBody }>
            <HierarchyView key={ formationName } staticTimetableHierarchy={ h } onClick={ onClick }/>
          </ExpansionPanelDetails>
        </ExpansionPanel>;
      }) }
    </Box>
  </Box>;
};


export default HierarchyView;
