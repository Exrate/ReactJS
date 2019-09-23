import { SET_ACTIVE_TICKET, REMOVE_ACTIVE_TICKET } from '../actions'

const initialState = -1

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TICKET:
      return action.index
    case REMOVE_ACTIVE_TICKET:
      return -1
    default:
      return state
  }
}