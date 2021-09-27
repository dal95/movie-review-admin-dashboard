import * as actions from '../actions/users'
const initialState = {
  users: [],
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  hasErrors: false
}

const userRducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_USER:
      return { ...state, isLoading: true }
    case actions.AUTH_USER_SUCCESS:
      return { ...state, isLoading: false, currentUser: action.payload }
    case actions.AUTH_USER_FAILURE:
      return { ...state, isLoading: false, hasErrors: action.error }
    case actions.AUTH_USER_LOGOUT:
      return { ...state, isLoading: false, currentUser: null }
    default:
      return state
  }
}

export default userRducers
