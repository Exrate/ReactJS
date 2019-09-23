import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Paper, Box } from '@material-ui/core'
import { parse, compareAsc } from 'date-fns'
import PatientList from '../patients/PatientList'
import * as utils from '../utils'

function sortPatients(patients) {
  const sortedPatients = patients && patients.length ? [...patients] : []

  sortedPatients.sort((a, b) => {
    const aServiceDate = parse(a.serviceDate, utils.dateTimeFormat, new Date())
    const bServiceDate = parse(b.serviceDate, utils.dateTimeFormat, new Date())

    return a.specialist.localeCompare(b.specialist) || compareAsc(aServiceDate, bServiceDate)
  })

  return sortedPatients
}

class Queue extends Component {
  render() {
    const sortedPatients = sortPatients(this.props.patients.filter(x => !x.isServiced))

    return (
      <Paper>
        <Box p={2}>
          <Typography variant="h4" component="h2" gutterBottom>
            Patients in queue
          </Typography>
          <PatientList patients={sortedPatients} />
        </Box>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patients
});

export default connect(mapStateToProps)(Queue);