import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useMemo, useState } from 'react';
import { deepGet, groupBy } from '../../lib';
import { useSectionTableStyles } from './styles';

const SectionTable = ({ title, sections, loading, onClick }) => {

  const [ expandedId, setExpandedId ] = useState(false);
  const handleChange = (sectionId, isExpanded) => {
    setExpandedId(isExpanded ? sectionId : false);
  };

  const groupedSections = useMemo(() => groupBy(sections, s => deepGet(s, 'name', '')),
    [ sections ]);

  const classes = useSectionTableStyles();
  return <Box className={ classes.rootBox }>
    <Box className={ classes.titleBox }>
      <Typography variant='h4'>{ title }</Typography>
    </Box>
    <Box className={ classes.bodyBox }>
      { loading && <CircularProgress/> }
      {
        Object.keys(groupedSections).sort().map(sectionName => {
          return <ExpansionPanel
            key={ sectionName }
            expanded={ expandedId === sectionName }
            onChange={ (_, isExpanded) => handleChange(sectionName, isExpanded) }
            className={ classes.expansionPanel }>
            <ExpansionPanelSummary className={ classes.heading } expandIcon={ <ExpandMoreIcon/> }>
              <Typography>{ sectionName }</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={ classes.expansionBody }>
              <Grid container spacing={ 1 }>
                { groupedSections[sectionName].map((section) => {
                  const sectionId = deepGet(section, 'id', undefined);
                  const year = deepGet(section, 'year', undefined);
                  return <Grid item xs={ 12 } lg={ 1 } key={ sectionId }>
                    <Button variant='outlined' color='primary' onClick={ () => onClick(section) }>{ year }</Button>
                  </Grid>;
                }) }
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>;
        }) }
    </Box>
  </Box>;
};

export default SectionTable;
