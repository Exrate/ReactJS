import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import PatientForm from '../patients/PatientForm';
import { Typography, Paper, Box } from '@material-ui/core'
import { addPatient, setActiveTicket } from '../actions';

class Registration extends Component {
  state = {
    redirect: false
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  handleSubmit(patient) {
    this.props.dispatch(addPatient(patient))
    this.props.dispatch(setActiveTicket(this.props.patients.indexOf(patient)))
    
    this.setRedirect()
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <Paper>
        <Box p={2}>
          <Typography variant="h4" component="h2" gutterBottom>
            Registration
          </Typography>
          <PatientForm onSubmit={this.handleSubmit.bind(this)} />
        </Box>
        { this.renderRedirect() }
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  activeTicket: state.activeTicket,
  patients: state.patients
});

export default connect(mapStateToProps)(Registration);