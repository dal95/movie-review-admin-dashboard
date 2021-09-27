import { combineReducers } from 'redux'
import moviesReducers from './movies'
import userRducers from './users'

const rootReducers = combineReducers({
  movies: moviesReducers,
  users: userRducers
})

export default rootReducers
