import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../helpers/auth'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!getToken()) return <Redirect to='login' />

  return <Route {...rest} render={props => <Component {...props} />} />
}
