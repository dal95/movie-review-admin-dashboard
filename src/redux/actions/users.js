import API from '../../services/api'
import history from '../../helpers/history'

export const AUTH_USER = 'AUTH_USER'
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS'
export const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE'

export const AUTH_USER_LOGOUT = 'AUTH_USER_LOGOUT'

export const authUser = () => {
  return {
    type: AUTH_USER
  }
}

export const authUserSuccess = user => {
  return {
    type: AUTH_USER_SUCCESS,
    payload: user
  }
}

export const authUserFailure = error => {
  return {
    type: AUTH_USER_FAILURE,
    payload: error
  }
}

// Async
export const authRequest = ({ email, password }, callback) => {
  return async dispatch => {
    dispatch(authUser())

    try {
      const res = await API.post('/users/login', {
        email,
        password
      })

      dispatch(authUserSuccess(res.data))
      callback()
    } catch (error) {
      dispatch(authUserFailure())
    }
  }
}
