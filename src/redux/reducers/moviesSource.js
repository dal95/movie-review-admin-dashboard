import * as actions from '../actions/movies'

const initialState = {
  movies: null,
  genres: null,
  isLoading: false,
  hasErrors: false
}

const movieSourceReducers = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default movieSourceReducers
