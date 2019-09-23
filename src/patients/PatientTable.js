import PropTypes from 'prop-types'
import React from 'react'
import MaterialTable from 'material-table'

const columns = [
  { field: 'firstName', title: 'First Name' },
  { field: 'lastName', title: 'Last Name' },
  { field: 'specialist', title: 'Specialist' },
  { field: 'birthDate', title: 'Birth Date' },
  { field: 'serviceDate', title: 'Service Date' },
  { field: 'addedOn', title: 'Registered On' }
]

export default function PatientTable(props) {
  return (
    <MaterialTable
      columns={columns}
      data={props.patients}
      title="Patients"
      actions={[
        row => ({
          icon: 'done',
          onClick: (_, row) => props.handleServiced(row, props.patients.indexOf(row)),
          disabled: row.isServiced
        })
      ]}
      options={{
        filtering: true,
        actionsColumnIndex: -1
      }}
    />
  )
}

PatientTable.propTypes = {
  handleServiced: PropTypes.func,
  patients: PropTypes.array
};
