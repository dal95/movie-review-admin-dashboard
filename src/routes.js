import Home from './pages/Home'
import Login from './pages/Login'
import MovieDetails from './pages/MovieDetails'
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
    exact: true,
    component: Movies
  },
  {
    path: '/movies/details/:id',
    component: MovieDetails
  }
]

export default routes
