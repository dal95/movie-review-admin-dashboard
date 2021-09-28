import Home from './pages/Home'
import Login from './pages/Login'
import Movies from './pages/Movies'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/movies',
    component: Movies
  }
]

export default routes
