import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { formatDistanceToNow, parse } from 'date-fns'
import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider
} from '@material-ui/core'
import * as utils from '../utils'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  inService: {
    fontWeight: '700'
  }
}));

export default function PatientList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {
        props.patients.map((patient, index) => (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body1"
                      className={`${patient.inServiceDate ? classes.inService : ''}`}
                      color="textPrimary"
                    >
                      {`${patient.specialist} ${patient.inServiceDate ? '(in service)' : ''}`}
                    </Typography>
                  </React.Fragment>}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {patient.lastName + ', ' + patient.firstName}
                    </Typography>
                    {` — ${formatDistanceToNow(parse(patient.serviceDate, utils.dateTimeFormat, new Date()), { addSuffix: true })}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            { props.patients.length - 1 !== index && props.patients[index + 1].specialist !== patient.specialist
              ? <Divider variant="inset" component="li" />
              : ""
            }
          </div>
        ))
      }
    </List>
  );
}

PatientList.propTypes = {
  patients: PropTypes.array
}