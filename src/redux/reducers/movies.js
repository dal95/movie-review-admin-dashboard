import * as actions from '../actions/movies'

const initialState = {
  movies: null,
  isLoading: false,
  hasErrors: false
}

const moviesReducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_MOVIES:
      return { ...state, isLoading: true }
    case actions.GET_MOVIES_SUCCESS:
      return { ...state, movies: action.payload, isLoading: false }
    case actions.GET_MOVIES_SUCCESS:
      return { ...state, isLoading: false, hasErrors: action.error }
    default:
      return state
  }
}

export default moviesReducers
