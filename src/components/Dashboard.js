import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Paper, Box } from '@material-ui/core'
import { formatDistanceToNow, parse } from 'date-fns'
import * as utils from '../utils'
import { addPatient } from '../actions';

class Dashboard extends Component {
  handleSubmit(patient) {
    this.props.dispatch(addPatient(patient))
  }

  render() {
    return (
      <Paper>
        <Box p={2}>
          <Typography variant="h4" component="h2" gutterBottom>
            Dashboard
          </Typography>
          { this.props.activeTicket === -1
          ? 'You are not currently in queue.'
          : this.renderInQueue() }
        </Box>
      </Paper>
    )
  }

  renderInQueue() {
    if (this.props.patients.length > this.props.activeTicket) {
      const patient = this.props.patients[this.props.activeTicket]
      const serviceDate = formatDistanceToNow(parse(patient.serviceDate, utils.dateTimeFormat, new Date()), { addSuffix: true })
      return (
        <span>You are currently in queue. Your service time is scheduled for {patient.serviceDate} ({serviceDate}).</span>
      )
    }
  }

}

const mapStateToProps = state => ({
  activeTicket: state.activeTicket,
  patients: state.patients
});

export default connect(mapStateToProps)(Dashboard);