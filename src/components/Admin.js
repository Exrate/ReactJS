import React, {Component} from 'react';
import { connect } from 'react-redux'
import { markAsServiced } from '../actions'
import { parse, compareAsc } from 'date-fns'
import PatientTable from '../patients/PatientTable'
import * as utils from '../utils'

function sortPatients(patients) {
  let sortedPatients = [...patients]

  sortedPatients.sort((a, b) => {
    const aServiceDate = parse(a.serviceDate, utils.dateTimeFormat, new Date())
    const bServiceDate = parse(b.serviceDate, utils.dateTimeFormat, new Date())
    return compareAsc(aServiceDate, bServiceDate)
  })

  return sortedPatients
}

class Admin extends Component {
  handleServiced = (patient, index) => {
    this.props.dispatch(markAsServiced(index))
  }

  render() {
    this.props.patients.sort((a, b) => {
      const aServiceDate = parse(a.serviceDate, utils.dateTimeFormat, new Date())
      const bServiceDate = parse(b.serviceDate, utils.dateTimeFormat, new Date())
      return compareAsc(aServiceDate, bServiceDate)
    })

    return (
      <div>
        <PatientTable patients={sortPatients(this.props.patients)} handleServiced={this.handleServiced.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patients
});

export default connect(mapStateToProps)(Admin);