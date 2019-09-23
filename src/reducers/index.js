import { combineReducers } from 'redux'
import patientReducer from './patientReducer'
import activeTicketReducer from './activeTicketReducer'

export default combineReducers({
  patients: patientReducer,
  activeTicket: activeTicketReducer
});