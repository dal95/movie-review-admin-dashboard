import Home from './pages/Home'
import Login from './pages/Login'
import MovieDetails from './pages/MovieDetails'
import Movies from './pages/Movies'
import Profile from './pages/Profile'

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
  },
  {
    path: '/profile',
    component: Profile
  }
]

export default routes
