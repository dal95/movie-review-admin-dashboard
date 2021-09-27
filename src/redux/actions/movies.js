import API from '../../../services/api'

export const GET_MOVIES = 'GET_MOVIES'
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS'
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE'

export const getMovies = () => ({
  type: GET_MOVIES
})

export const getMoviesSuccess = movies => {
  return {
    type: GET_MOVIES_SUCCESS,
    payload: movies
  }
}

export const getMoviesFailure = error => {
  console.log(error)

  return {
    type: GET_MOVIES_FAILURE,
    error
  }
}

// Async actions
export const fetchMovies = (params = {}) => {
  return async dispatch => {
    dispatch(getMovies())

    try {
      const res = await API.get('/movies', { params })

      dispatch(getMoviesSuccess(res.data))
    } catch (error) {
      dispatch(getMoviesFailure(error))
    }
  }
}
