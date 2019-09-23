export const MARK_AS_SERVICED = 'MARK_AS_SERVICED'
export const ADD_PATIENT = 'ADD_PATIENT'
export const UPDATE_PATIENTS = 'UPDATE_PATIENTS'
export const UPDATE_PATIENTS_IN_SERVICE = 'UPDATE_PATIENTS_IN_SERVICE'
export const SET_ACTIVE_TICKET = 'SET_ACTIVE_TICKET' 
export const REMOVE_ACTIVE_TICKET = 'REMOVE_ACTIVE_TICKET' 

export function setActiveTicket(index) {
  return {
    type: SET_ACTIVE_TICKET,
    index
  }
}

export function removeActiveTicket(index) {
  return {
    type: REMOVE_ACTIVE_TICKET,
    index
  }
}

export function markAsServiced(index) {
  return {
    type: MARK_AS_SERVICED,
    index
  };
}

export function addPatient(patient) {
  return {
    type: ADD_PATIENT,
    patient
  };
}

export function updatePatients(patients) {
  return {
    type: UPDATE_PATIENTS,
    patients
  }
}

export function updatePatientsInService() {
  return function(dispatch) {
    return dispatch({
      type: UPDATE_PATIENTS_IN_SERVICE
    })
  }
}

export function fetchPatients() {
  return function(dispatch) {
    return fetch('http://localhost:9000/patients')
      .then(response => response.json())
      .then(patients => {
        dispatch(updatePatients(patients))
      })
  }
}