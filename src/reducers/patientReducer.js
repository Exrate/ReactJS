import { ADD_PATIENT, MARK_AS_SERVICED, UPDATE_PATIENTS, UPDATE_PATIENTS_IN_SERVICE } from '../actions'
import { format, parse, compareAsc } from 'date-fns'
import * as utils from '../utils'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PATIENT:
      const newState = [...state]
      action.patient.addedOn = format(new Date(), utils.dateTimeFormat)
      newState.push(action.patient)
      return newState
    case UPDATE_PATIENTS:
      return action.patients
    case MARK_AS_SERVICED:
      if (state[action.index]) {
        const newState = [...state]
        const servicedPatient = newState[action.index]
        servicedPatient.isServiced = true;
        return newState;
      }
      break
    case UPDATE_PATIENTS_IN_SERVICE:
      const patientsGroupedBySpecialist = groupBy(state.filter(x => !x.isServiced), 'specialist')
      for (let specialist in patientsGroupedBySpecialist) {
        const filteredPatients = filterPatientsDue(patientsGroupedBySpecialist[specialist])

        if (filteredPatients.length && !filteredPatients[0].inServiceDate) {
          filteredPatients[0].inServiceDate = format(new Date(), utils.dateTimeFormat)
        }
      }
      return [...state]
    default:
      return state;
  }
}

const groupBy = (array, key) => {
  return array.reduce((resultingArray, currentValue) => {
    (resultingArray[currentValue[key]] = resultingArray[currentValue[key]] || []).push(currentValue)
    return resultingArray;
  }, {});
};

const filterPatientsDue = (patients) => {
  return patients.filter(patient => {
    const patientServiceDate = parse(patient.serviceDate, utils.dateTimeFormat, new Date())
    const isPatientDue = compareAsc(patientServiceDate, new Date()) <= 0

    return isPatientDue
  });
}