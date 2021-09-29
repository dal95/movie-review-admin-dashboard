import API from '../../services/api'

export const GET_MOVIES = 'GET_MOVIES'
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS'
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE'

// add movie
export const ADD_MOVIE = 'ADD_MOVIE'
export const ADD_MOVIE_SUCCESS = 'ADD_MOVIE_SUCCESS'
export const ADD_MOVIE_FAILURE = 'ADD_MOVIE_FAILURE'

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
  return {
    type: GET_MOVIES_FAILURE,
    error
  }
}

export const addMovie = () => ({
  type: ADD_MOVIE
})

export const addMovieSuccess = movie => {
  return {
    type: ADD_MOVIE_SUCCESS,
    payload: movie
  }
}

export const addMovieFailure = error => {
  return {
    type: ADD_MOVIE_FAILURE,
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

export const postMovie = movie => {
  return async dispatch => {
    dispatch(addMovie())

    try {
      const res = await API.post('/movies', movie)

      dispatch(addMovieSuccess(res.data))
      return Promise.resolve(res.data)
    } catch (error) {
      dispatch(addMovieFailure(error))
    }
  }
}
